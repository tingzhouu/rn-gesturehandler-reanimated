import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Animated, TouchableOpacity,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export const Separator = () => {
  return <View style={styles.separator} />;
};

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.leftAction}>
      <Animated.Text
        style={[styles.actionText, { transform: [{ scale }] }]}
      >
        Add to Cart
      </Animated.Text>
    </View>
  );
};

const RightActions = ({ progress, dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <TouchableOpacity onPress={onPress} style={styles.rightAction}>
      <Animated.Text
        style={[styles.actionText, { transform: [{ scale }] }]}
      >
        Delete
      </Animated.Text>
    </TouchableOpacity>
  );
};

const ListItem = ({ text, onSwipeFromLeft, onRightPress }) => {
  return (
    <Swipeable
      renderLeftActions={LeftActions}
      renderRightActions={(progress, dragX) => <RightActions progress={progress} dragX={dragX} onPress={onRightPress} />}
      onSwipeableLeftOpen={onSwipeFromLeft}
    >
      <View style={styles.listItem}>
        <Text numberOfLines={2} style={styles.text}>{text}</Text>
      </View>
    </Swipeable>
  );
}

export default ListItem;

const styles = StyleSheet.create({
  text: {
    color: '#4A4A4A',
    fontSize: 15,
  },
  listItem: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#E4E4E4',
    marginLeft: 10,
  },
  leftAction: {
    backgroundColor: '#388E3C',
    justifyContent: 'center',
    flex: 1,
  },
  rightAction: {
    backgroundColor: '#DD2C00',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actionText: {
    color: '#FFF',
    fontWeight: '600',
    padding: 20,
  }
});
