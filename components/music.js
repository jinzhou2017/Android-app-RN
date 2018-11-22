import React, { Component } from 'react';
import {  View, Text, } from 'react-native';
import {
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import New from './Music/new'
import Recommend from './Music/recommend'
import Collect from './Music/collect'
export default Music = TabNavigator({
  '最新': {
    screen: New
  },
  '推荐': {
    screen: Recommend
  },
  '收藏': {
    screen: Collect
  },
}, {
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: '#fff',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: '#0291CB',
    },
    tabStyle: {
      borderBottomColor: '#fff'
    }
  },
});
