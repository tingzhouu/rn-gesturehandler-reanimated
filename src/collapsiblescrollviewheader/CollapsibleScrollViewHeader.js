import * as React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Header } from './Header';
import { List } from './List';

// taken from https://blog.bam.tech/developper-news/an-introduction-to-react-native-reanimated

const CollapsibleScrollViewHeader = () => {
  const y = new Animated.Value(0);
  return (
    <View>
      <Header y={y} />
      <List y={y} />
    </View>
  );
};

export default CollapsibleScrollViewHeader;
