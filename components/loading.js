import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
let ScreenHeight = Dimensions.get("window").height;
export default class Loading extends Component {
  render() {
    return (
      <ActivityIndicator
        color='#2496FF'
        style={styles.loading}
        size="large"
      />
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    height: ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingImg: {
    fontWeight: 'bold',
  }
})