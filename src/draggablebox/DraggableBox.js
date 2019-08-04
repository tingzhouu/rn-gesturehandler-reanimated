import React, { Component } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import {
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

class DraggableBox extends Component {
  static navigationOptions = {
    title: 'Draggable Box',
  };

  constructor(props) {
    super(props);
    this.translateX = new Animated.Value(0);
    this.translateY = new Animated.Value(0);
    this.onGestureEvent = Animated.event([
      {
        nativeEvent:
        {
          translationX: this.translateX,
          translationY: this.translateY,
        },
      },
    ]);
  }

  render() {
    return (
      <View style={styles.main}>
        <PanGestureHandler
          onGestureEvent={this.onGestureEvent}
        >
          <Animated.View
            style={[
              styles.box,
              {
                transform: [
                  { translateX: this.translateX },
                  { translateY: this.translateY },
                ],
              }
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
    width: 150,
    height: 150,
    alignSelf: 'center',
    backgroundColor: 'plum',
    margin: 10,
  },
});

export default DraggableBox;
