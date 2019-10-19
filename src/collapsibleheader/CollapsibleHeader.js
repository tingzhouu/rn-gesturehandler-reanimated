import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';

class CollapsibleHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }

  collapseText = () => {
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed});
  }

  render() {
    const { isCollapsed } = this.state;
    return (
      <View>
        <Text onPress={this.collapseText}>Press me</Text>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dependant 1</Text>
          <Collapsible collapsed={isCollapsed}>
            <Text style={styles.field}>Dependant 1 Field</Text>
          </Collapsible>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dependant 2</Text>
          <Text style={styles.field}>Dependant 2 Field</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dependant 3</Text>
          <Text style={styles.field}>Dependant 3 Field</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dependant 4</Text>
          <Text style={styles.field}>Dependant 4 Field</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: 'orange',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    height: 50,
  },
  field: {
    width: '100%',
    height: 35,
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
});

export default CollapsibleHeader;
