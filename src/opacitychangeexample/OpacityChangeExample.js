import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const {
  cond,
  eq,
  Value,
  event,
} = Animated;

// Taken from https://codedaily.io/tutorials/53/Introduction-to-Reanimated-in-React-Native
class OpacityChangeExample extends Component {
  static navigationOptions = {
    title: 'Opacity Change',
  };

  constructor(props) {
    super(props);
    const state = new Value(-1);

    // (2): Handle storing that the user has tapped on something
    // In this example, we will be using Animated.event.
    // Reanimated's Animated.event works the same way as React Native's.
    // Animated.event Takes an ARRAY of mappings and extracts values from each argument
    // accordingly, then calls setValue on the mapped outputs.

    // React Native Gesture Handler provides a special prop called state.
    // This special prop holds the current state that the gesture handler is in.
    // When the user taps, the state changes from BEGAN => ACTIVE => END
    this.onStateChange = event([{
      nativeEvent: {
        state,
      },
    }]);

    // (3): Declare the animation logic
    this.opacity = cond( // if
      eq(state, State.BEGAN), // state equals to STATE.BEGAN, aka when user taps,
      0.2, // set opacity to this value.
      1, // otherwise, set opacity to this value.
    );
  }

  render() {
    return (
      <View style={styles.main}>
        <TapGestureHandler
          onHandlerStateChange={this.onStateChange} // Start Point (1): This is the handler for a press
          // onHandlerStateChange takes a callback that is going to be triggered
          // when state of the given handler changes.
          // Instead of a callback, Animated.event object can be used.
        >
          <Animated.View
            style={[styles.box, { opacity: this.opacity }]}
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

export default OpacityChangeExample;
