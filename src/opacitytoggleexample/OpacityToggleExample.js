import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

const {
  Value,
  Clock,
  event,

  block,
  cond,
  and,
  eq,
  neq,
  set,
  startClock,
  timing,
  stopClock,
  interpolate,
  Extrapolate,
} = Animated;

// Taken from https://codedaily.io/courses/7/React-Native-Reanimated-Fundamentals/132

const runOpacityTimer = (clock, gestureState) => {
  // setup configuration for clock
  const state = {
    finished: new Value(0), // set when animation is complete
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  // setup configuration for timing animation
  const config = {
    duration: 1000,
    toValue: new Value(-1),
    easing: Easing.inOut(Easing.ease),
  };

  // declarative nature of react native reanimated where it sends everything over the bridge ONCE
  // after which, everything is handled natively
  // As a result, we need to import a lot of comparisons and instructions for the animation
  // we need block, condition, and, eq, neq, set, startClock, timing, stopClock, interpolate

  // we now setup our return value for opacity
  return block([ // we will return a block of conditions
    // the order of array does not matter, except for the last value
    // the last value of the array block will be fed to opacity,
    // which also means that the value has to be between 0 and 1.

    // first, we need to setup our timing
    timing(clock, state, config),

    // next, setup a condition for when the timing animation and clock has been completed
    cond(state.finished, stopClock(clock)),

    // next, we need to setup the condition for when to start the clock
    cond( // if
      and( // meet both conditions below
        eq(gestureState, State.BEGAN), // gesture state === State.BEGAN, aka once the tap has occurred
        neq(config.toValue, 1), // config.toValue !== 1, prevents this from running if config.toValue is 1
      ),
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.frameTime, 0),
        set(config.toValue, 1),
        startClock(clock),
      ],
    ),

    // next, we also need to setup the condition for when the user releases the tap, performing the reverse animation
    cond( // if
      and( // && meet both conditions below
        eq(gestureState, State.END), // gesture state === State.END, aka once the tap has occurred
        neq(config.toValue, 0), // config.toValue !== 0, prevents this from running if config.toValue is 0
      ),
      [
        set(state.finished, 0),
        set(state.time, 0),
        set(state.frameTime, 0),
        set(config.toValue, 0), // set toValue to 0
        startClock(clock),
      ],
    ),

    // finally, the return value
    interpolate(state.position, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    }),
  ]);
};

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

  opacity = runOpacityTimer(this.clock, this.gestureState)

  render() {
    return (
      <View style={styles.main}>
        <TapGestureHandler
          onHandlerStateChange={this.onStateChange}
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

export default OpacityToggleExample;
