import React, { Component } from 'react';
import {
  SafeAreaView, FlatList, StyleSheet, Alert,
} from 'react-native';

import quotes from './quotes';
import ListItem, { Separator } from './ListItem';

class SwipeGesture extends Component {
  static navigationOptions = {
    title: 'Swipe Gesture',
  };

  renderFlatListItem = ({ item }) => {
    return (
      <ListItem
        {...item}
        onSwipeFromLeft={() => Alert.alert('swiped from left')}
        onRightPress={() => Alert.alert('pressed right')}
      />
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.main}>
        <FlatList
          data={quotes}
          keyExtractor={item => item.text}
          renderItem={this.renderFlatListItem}
          ItemSeparatorComponent={() => <Separator />}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});

export default SwipeGesture;
