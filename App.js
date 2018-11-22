/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  Dimensions 
} from 'react-native';
import axios from 'axios';
import Food from './components/Food';
import { StackNavigator, TabNavigator, TabBarBottom, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Music from './components/music'
import Movie from './components/movie'
import Book from './components/book'
import MovieDetail from './components/Movie/movieDetail'

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
const movieStack = StackNavigator({
  movie: Movie,
  movieDetail: MovieDetail
},{
    initialRouteName: 'movie',
    mode: 'modal',
    headerMode: 'none',
})
const RootStack = TabNavigator({
  '电影': {
    screen: movieStack
  },
  '音乐': { screen: Music },
  '图书': {
    screen: Book
  },
}, {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === '电影') {
          iconName = `ios-star${focused ? '' : '-outline'}`;
        } else if (routeName === '音乐') {
          iconName = `ios-musical-note${focused ? '' : '-outline'}`;
        }else if(routeName === '图书') {
          iconName = `ios-book${focused ? '' : '-outline'}`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: '#FFD900',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: '#1C1C1C',
      },
      tabStyle: {
        borderBottomColor: '#fff'
      }
    },
});
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingFlag: true
    }
  }
  handleTime() {
    let that = this;
    setTimeout(function() {
      that.setState({
        loadingFlag: false
      })
    },500)
  }
  componentDidMount() {
    this.handleTime()
  }
  render() {
    const { loadingFlag } = this.state;

    return (
      <View style={styles.container}>
        {loadingFlag ? (
          <View style={styles.loading}>
            <Image
              style={styles.loadingImg}
              resizeMode='contain'
              source={require('./img/v2-7c0f51fb5807aa25a33fc15210dbc499_b.jpg')}
            />
          </View>
        ):(
          < RootStack tabBarStyle={
            styles.tab
          } > </RootStack>
        )}
      </View>   
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  logo: {
    width: 50,
    height: 100,
  },
  contentContainer: {
    paddingVertical: 20,
  },
  tab: {
    height: 20,
    backgroundColor: '#1C1C1C'
  },
  loading: {
    flex: 1,
    height: ScreenHeight,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loadingImg: {
    width: ScreenWidth,
  }
});
