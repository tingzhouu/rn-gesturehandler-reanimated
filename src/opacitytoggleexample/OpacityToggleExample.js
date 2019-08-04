import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const {
  Value,
  Clock,
  event,
} = Animated;

// Taken from https://codedaily.io/courses/7/React-Native-Reanimated-Fundamentals/132
class OpacityToggleExample extends Component {
  static navigationOptions = {
    title: 'Opacity Toggle Example',
  };

  gestureState = new Value(-1);

  clock = new Clock();

  onStateChange = event([
    {
      nativeEvent: { state: this.gestureState },
    },
  ]);

  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <View style={styles.main}>
        <TapGestureHandler
        >
          <Animated.View
            style={[styles.box]}
          />
        </TapGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  box: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    backgroundColor: 'plum',
    margin: 10,
  },
});

export default OpacityToggleExample;
