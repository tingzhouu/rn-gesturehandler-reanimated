/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { Text } from 'react-native';
import Animated from 'react-native-reanimated';

const HEADER_HEIGHT = 60;
const { diffClamp, interpolate } = Animated;

export const Header = (props) => {
  const diffClampY = diffClamp( // refer to diffclamp file for an understanding of how diffclamp function works.
    props.y, // input value
    0, // minimum output value
    HEADER_HEIGHT, // maximum output value
  );

  const translateY = interpolate(diffClampY, { // use interpolate to create an inverse relationship
  // const translateY = interpolate(diffClampY, { // create an inverse relationship
    inputRange: [0, HEADER_HEIGHT], // when input value increases (scrolling down),
    outputRange: [0, HEADER_HEIGHT], // output value decreases (shift header up) and vice versa.
  });
  return (
    <Animated.View // We use Animated to shift the position of Header.
      style={{
        height: HEADER_HEIGHT,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 2,
        backgroundColor: '#ffb74d',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateY }], // IMPORTANT LINE, to translateY according to values calculated
        // from diffCLampY and translateY above
      }}
    >
      <Text>Header</Text>
    </Animated.View>
  );
};
