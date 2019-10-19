import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';

import SwipeGesture from './src/swipegesture/SwipeGesture';
import DraggableBox from './src/draggablebox/DraggableBox';
import DraggableBox2 from './src/draggablebox2/DraggableBox2';
import OpacityChangeExample from './src/opacitychangeexample/OpacityChangeExample';
import OpacityToggleExample from './src/opacitytoggleexample/OpacityToggleExample';
import CollapsibleScrollViewHeader from './src/collapsiblescrollviewheader/CollapsibleScrollViewHeader';
import CollapsibleNavHeaderWithSnap from './src/collapsiblenavheaderwithsnap/CollapsibleNavHeaderWithSnap';
import CollapsibleHeader from './src/collapsibleheader/CollapsibleHeader';

const ItemSeparator = () => <View style={styles.separator} />;

const SCREENS = {
  SwipeGesture: { screen: SwipeGesture, title: 'Swipe Gesture' },
  OpacityChangeExample: { screen: OpacityChangeExample, title: 'Opacity Change' },
  OpacityToggleExample: { screen: OpacityToggleExample, title: 'Opacity Toggle' },
  DraggableBox: { screen: DraggableBox, title: 'Draggable Box' },
  CollapsibleScrollViewHeader: { screen: CollapsibleScrollViewHeader, title: 'Collapsible ScrollView Header' },
};

class MainScreen extends React.Component {
  static navigationOptions = {
    title: '✌️ Reanimated and Gesture Handler Demo',
  };

  onPressNavigateToPage = (item) => {
    const { navigation } = this.props;
    navigation.navigate(item.key);
  }

  render() {
    const data = Object.keys(SCREENS).map(key => ({ key }));
    return (
      <FlatList
        data={data}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onPressNavigateToPage(item)}
          >
            <Text style={styles.buttonText}>{SCREENS[item.key].title || item.key}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }
}

const App = createStackNavigator(
  {
    DraggableBox2: { screen: DraggableBox2 },
    // Main: { screen: MainScreen },
    // ...SCREENS,
  },
);

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
  },
  separator: {
    height: 1,
    backgroundColor: '#DBDBE0',
  },
  buttonText: {
    backgroundColor: 'transparent',
  },
  button: {
    flex: 1,
    height: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default createAppContainer(App);
