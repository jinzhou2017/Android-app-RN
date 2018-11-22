/**
 * Created by Administrator on 2018/4/26.
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import axios from 'axios';

export default class Food extends Component {
  constructor(props) {
    super(props)
    this.state = {
      navs : [
        '电影',
        '音乐',
        '图书'
      ]
    }
  }
  render() {
    const { navs } = this.state
    return (
      <View style={styles.food}>
        {navs.map((item) => <Text key={item} style={styles.foodItem}>{item}</Text>)}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  food: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    top: 0,
    left: 0,
  },
  foodItem: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  }
})