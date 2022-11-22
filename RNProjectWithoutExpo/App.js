import React from 'react';
import {StyleSheet, View} from 'react-native';

const App = () => {
  return <View style={styles.screen}>Hello World!</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
