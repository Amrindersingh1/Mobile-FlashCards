import React, { Component } from "react";
import { FlatGrid } from 'react-native-super-grid';
import { connect } from "react-redux";
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import { handleInitialData } from "../../actions/index";
import getColors from '../../utils/colors';

const colors = getColors();

export class TopicList extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }

  render() {
    const { topics, navigation } = this.props;

    return (
        <FlatGrid
        itemDimension={130}
        items={Object.values(topics)}
        style={styles.gridView}
        renderItem={({ item, index }) => (
            <TouchableOpacity
              key={item.title}
              onPress={() =>
                navigation.navigate('TopicDetail', { title: item.title, index: index })
              }
            >
            <View style={[styles.itemContainer, { backgroundColor: colors[index] }]}>
              <Text style={styles.itemName}>{item.title}</Text>
              <Text style={styles.itemDesc}>{item.questions.length} Questions</Text>
            </View>
            </TouchableOpacity>
          )}
      />
    );
  }
}


const mapStateToProps = (state) => ({ topics: state });

const styles = StyleSheet.create({
    gridView: {
      marginTop: 20,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemDesc: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
  });

export default connect(mapStateToProps, { handleInitialData })(TopicList);
