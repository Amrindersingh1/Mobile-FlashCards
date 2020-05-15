import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { addCardToTOPIC } from "../../actions/index";
import { Button } from "react-native-elements";

export class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  handleQuestionChange = (question) => {
    this.setState({ question });
  };

  handleAnswerChange = (answer) => {
    this.setState({ answer });
  };

  handleSubmit = () => {
    const { addCardToTOPIC, title, navigation } = this.props;
    const card = {
      question: this.state.question,
      answer: this.state.answer,
    };

    addCardToTOPIC(title, card);
    this.setState({ question: "", answer: "" });
    navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.block}>
            <Text style={styles.title}>Add a question</Text>
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.question}
              onChangeText={this.handleQuestionChange}
              placeholder="Question"
            />
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.answer}
              onChangeText={this.handleAnswerChange}
              placeholder="Answer"
            />
          </View>

          <Button
            onPress={this.handleSubmit}
            disabled={this.state.question === "" || this.state.answer === ""}
            title="Submit"
          />
        </View>
        <View style={{ height: "30%" }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: "white",
    justifyContent: "space-around",
  },
  block: {
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
  },
});

const mapStateToProps = (state, { route }) => {
  const { title } = route.params;

  return {
    title,
  };
};

export default connect(mapStateToProps, { addCardToTOPIC })(AddCard);
