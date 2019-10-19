/* eslint-disable no-underscore-dangle */
// https://blog.swmansion.com/simple-physics-with-reanimated-part-1-9d55d36f73cd
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const { event, Value, cond, eq, set, add } = Animated;

function interaction(gestureTranslation, gestureState) {
  const start = new Value(0);
  const dragging = new Value(0);
  const position = new Value(0);

  return cond(
    eq(gestureState, State.ACTIVE),
    // if state is active
    [
      cond(dragging, [set(dragging, 1), set(start, position)]),
      set(position, add(start, gestureTranslation)),
    ],
    // if state is NOT active
    [set(dragging, 0), position],
  );
}

class DraggableBox extends Component {
  static navigationOptions = {
    title: 'Falling Box',
  };

  constructor(props) {
    super(props);

    const gestureX = new Value(0);
    // const gestureY = new Value(0);
    const stateOfGesture = new Value(-1);

    this._onGestureEvent = event([
      {
        nativeEvent: {
          translationX: gestureX,
          // translationY: gestureY,
          state: stateOfGesture,
        },
      },
    ]);

    this._transX = interaction(gestureX, stateOfGesture);
    // this._transY = interaction(gestureY, stateOfGesture);
  }

  render() {
    return (
      <View style={styles.main}>
        <PanGestureHandler
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this.onGestureEvent}
        >
          <Animated.View
            style={[
              styles.box,
              {
                transform: [{
                  translateX: this._transX,
                  // translateY: this._transY,
                }],
              },
            ]}
          />
        </PanGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  box: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    backgroundColor: 'plum',
    margin: 10,
  },
  moveButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'khaki',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default DraggableBox;
