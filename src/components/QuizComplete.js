import React from "react";
import { StyleSheet } from "react-native";
import { Container, Button, Text, View } from "native-base";

export default function QuizComplete({ correctCount, questionsLength, restartQuiz, }) {
    return (
        <Container style={styles.quizDone}>
            <View>
                <Text style={{ fontSize: 20, alignSelf: "center" }}>Quiz Complete</Text>
                <Text style={{ fontSize: 20, alignSelf: "center" }}>
                    Result{" "}
                    {Math.round(
                        (correctCount / questionsLength) * 100
                    )}
          % correct
        </Text>
                <Button block style={styles.btn} onPress={() => restartQuiz()}>
                    <Text>Restart</Text>
                </Button>
            </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    quizDone: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
    },
    btn: {
        margin: 20,
        backgroundColor: "purple",
    },
});
