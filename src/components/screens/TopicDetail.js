import React, { Component } from "react";
import { View, StyleSheet,Text } from "react-native";
import { Button } from 'react-native-elements';
import { connect } from "react-redux";
import { removeTOPIC } from "../../actions/index";
import getColors from '../../utils/colors';

const colors = getColors();

export class TopicDetail extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }

  handleDelete = (id) => {
    this.props.removeTOPIC(id);
    this.props.navigation.goBack();
  };

  render() {
    const { topic,index } = this.props;

    return (
      <View style={styles.container}>
        <View
          style={[styles.itemContainer, { backgroundColor: colors[index] }]}
        >
          <Text style={styles.itemName}>{topic.title}</Text>
          <Text style={styles.itemDesc}>{topic.questions.length} Questions</Text>
        </View>
        <Button
          style={[styles.btn]}
          onPress={() =>
            this.props.navigation.navigate("AddCard", { title: topic.title })
          }
          title="Add Card"
          color="purple"
        />
        <Button
          style={[styles.btn]}
          onPress={() =>
            this.props.navigation.navigate("Quiz", { title: topic.title })
          }
          title="Start Quiz"
          color="pink"
          type="outline"
        />
        <Button
          style={[styles.btn]}
          onPress={() => this.handleDelete(topic.title)}
          title="Delete Deck"
          color="red"
          type="clear"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingLeft: 50,
    paddingRight: 50,
    paddingBottom: 20,
    backgroundColor: "white",
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemDesc: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
  btn: {
    marginTop: 20,
  }
});

const mapStateToProps = (state, { route }) => {
  const {title, index} = route.params;
  const topic = Object.values(state)[index];
  
  return {
    topic,index
  };
};

export default connect(mapStateToProps, { removeTOPIC })(TopicDetail);
