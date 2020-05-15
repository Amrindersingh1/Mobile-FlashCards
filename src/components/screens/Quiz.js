import React from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";
import { Container, Button, Text, View } from "native-base";
import { connect } from "react-redux";
import QuizComplete from "../QuizComplete";

class Quiz extends React.Component {

    state = {
        index: 0,
        correctAnswers: 0,
        isComplete: false,
        flipButtonText: "Show Answer",
    };

    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
            }).start();
            this.setState({ flipButtonText: "Show Answer" });
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10,
            }).start();
            this.setState({ flipButtonText: "Show Question" });
        }
    }

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        });
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ["0deg", "180deg"],
        });
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ["180deg", "360deg"],
        });
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0],
        });

        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1],
        });
    }

    markQuestion(isCorrect) {
        this.setState((state, props) => {
            const updatedIndex = ++state.index;
            return {
                correctAnswers: isCorrect
                    ? ++state.correctAnswers
                    : state.correctAnswers,
                index: updatedIndex,
                isComplete: props.topic.questions.length === updatedIndex,
            };
        });

        this.value = 180;

        this.flipCard();
    }

    restartQuiz = () => {
        this.setState({
            correctAnswers: 0,
            index: 0,
            isComplete: false,
        });

        this.value = 180;
        this.flipCard();
    };

    render() {
        const { questions } = this.props.topic;
        if (this.state.isComplete) {
            return (
                <QuizComplete
                    correctCount={this.state.correctAnswers}
                    questionsLength={this.props.topic.questions.length}
                    restartQuiz={this.restartQuiz}
                />
            );
        } else if (questions && questions.length) {
            return this.questionsQuiz(questions);
        } else {
            return (
                <Container style={styles.noQuizcontainer}>
                    <View>
                        <Text
                            style={{
                                fontSize: 20,
                                alignSelf: "center",
                                marginLeft: 20,
                                marginRight: 20,
                                color: "black",
                            }}
                        >
                            Sorry, there are no cards in the topic.
            </Text>
                    </View>
                </Container>
            );
        }
    }

    questionsQuiz(questions) {
        const frontAnimatedStyle = {
            transform: [
                {
                    rotateY: this.frontInterpolate,
                },
            ],
        };

        const backAnimatedStyle = {
            transform: [
                {
                    rotateY: this.backInterpolate,
                },
            ],
        };

        const { index } = this.state;

        return (
            <Container style={styles.container}>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.questionCounterText}>
                        {index + 1}/{questions.length}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Animated.View
                        style={[
                            frontAnimatedStyle,
                            styles.questionView,
                            { opacity: this.frontOpacity, borderRadius: 30 },
                        ]}
                    >
                        <Text style={styles.questionText}>{questions[index].question}</Text>
                    </Animated.View>
                    <Animated.View
                        style={[
                            backAnimatedStyle,
                            styles.questionView,
                            styles.backView,
                            { opacity: this.backOpacity, borderRadius: 30 },
                        ]}
                    >
                        <Text style={styles.questionText}>{questions[index].answer}</Text>
                    </Animated.View>
                </View>
                <View>
                    <Button style={styles.btn} onPress={() => this.flipCard()} block>
                        <Text
                            style={{ fontSize: 10, alignSelf: "flex-end", color: "white" }}
                        >
                            {this.state.flipButtonText}
                        </Text>
                    </Button>
                </View>
                <View style={{ flex: 1 }}>
                    <Button
                        block
                        style={styles.btnAnswer}
                        onPress={() => this.markQuestion(true)}
                        success
                    >
                        <Text>Correct</Text>
                    </Button>
                    <Button
                        block
                        style={styles.btnAnswer}
                        onPress={() => this.markQuestion(false)}
                        danger
                    >
                        <Text>Incorrect</Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

function mapStateToProps(state, { route }) {
    const { title } = route.params;
    const topic = state[title];

    return {
        topic,
    };
}

export default connect(mapStateToProps)(Quiz);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
    },
    questionView: {
        width: Dimensions.get("window").width - 20,
        height: 300,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "purple",
        backfaceVisibility: "hidden",
        marginLeft: 10,
    },
    backView: {
        position: "absolute",
        top: 0,
    },
    btnAnswer: {
        margin: 20,
    },
    questionCounterText: {
        fontSize: 20,
        marginLeft: 20,
    },
    questionText: {
        fontSize: 25,
        marginLeft: 10,
        marginRight: 10,
        color: "white",
    },
    btn: {
        marginTop: 50,
        marginLeft: 50,
        marginRight: 50,
    },
});
