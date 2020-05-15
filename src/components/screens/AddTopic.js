import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { addTOPIC } from '../../actions/index';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      paddingLeft: 50,
      paddingRight: 50,
      paddingBottom: 20,
      backgroundColor: 'white'
    },
    block: {
      marginBottom: 20
    },
    title: {
      textAlign: 'center',
      fontSize: 32,
      fontWeight: 'bold'
    },
    input: {
      borderWidth: 1,
      borderColor: 'grey',
      backgroundColor: 'white',
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      fontSize: 20,
      height: 40,
      marginBottom: 20
    }
  });

export class AddTopic extends Component {

  state = {
    text: ''
  };

  handleChange = text => {
    this.setState({ text });
  };

  handleSubmit = () => {
    const { addTOPIC, navigation } = this.props;

    addTOPIC(this.state.text);
    this.setState(() => ({ text: '' }));
    navigation.goBack();

  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 60 }} />
        <View style={styles.block}>
          <Text style={styles.title}>Add Title for new Topic:</Text>
        </View>
        <View style={[styles.block]}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            onChangeText={this.handleChange}
          />
        </View>
        <Button
            onPress={this.handleSubmit}
            title="Create Topic"
            color="purple"
            />
      </View>
    );
  }
}



export default connect(
  null,
  { addTOPIC }
)(AddTopic);