/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { onScroll } from 'react-native-redash';

export const List = (props) => {
  return (
    <Animated.ScrollView
      // Use onScroll of ScrollView to update the y value.
      // Use onScroll of react-native-redash to bind the y value.
      onScroll={onScroll({ y: props.y })}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingTop: 50 }}
    >
      {Array.from({ length: 10 }, (v, k) => (
        <Image
          style={{ width: '100%', height: 200, marginTop: 50 }}
          key={`${k}`}
          source={{ uri: 'https://picsum.photos/200/300' }}
        />
      ))}
    </Animated.ScrollView>
  );
};
