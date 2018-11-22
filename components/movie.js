import React, { Component } from 'react';
import { 
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
  Button,
  TouchableHighlight,
  ActivityIndicator
    } from 'react-native';
import { Carousel } from 'teaset';
import axios from 'axios';

import Loading from './loading'

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get('window').width;
export default class Movie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: []
    };
    this.getMovies = this.getMovies.bind(this);
  }
  getMovies() {
    axios.get('https://api.douban.com/v2/movie/in_theaters')
      .then((response) => response.data.subjects)
      .then((responseJson) => {
        this.setState({
          movies: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handlerRating(rating) {
    let end = ['0']
    if(rating.toString().length === 1) {
       end.unshift(rating)
       return end.join('.')
    }
    return rating
  }
  componentWillMount() {
    this.getMovies();
  }
  render() {
    const { movies } = this.state
    const Listsss = movies.length === 0 ? (
      <Loading/>
    ) : (
      movies.map((movie) => (
        <TouchableHighlight
          key={movie.id}
          onPress={() => this.props.navigation.navigate('movieDetail', {
            id: movie.id
          })}
        >
          <View
        style={styles.movieItem}
       >
        <View style={styles.left}>
          <Image
              style={styles.logo}
              key={movie.images}
              resizeMode='stretch'
              source={{ uri: movie.images ? movie.images.small : '' }}
          />
        </View>
        <View style={styles.right}
        >
          <View style={styles.rHeader}>
            <Text key={movie.title}>{movie.title}</Text>
            <Text key={movie.rating.average}
              style={styles.rating}
            >评分:{this.handlerRating(movie.rating.average)}</Text>
          </View>
          <Text>{movie.genres.join('|')}</Text>
          <Text>演员阵容:{movie.casts.map((cast) => cast.name).join('|')}</Text>
        </View>
      </View>
        </TouchableHighlight>
      ))
    )
    return (
      <View >
        <ScrollView>
          { movies.length === 0 ? <View/> : (
            <Carousel style={{height: 238,marginTop: 10,paddingLeft:5,paddingRight:5}}>
              <Image style={{width: ScreenWidth, height: 238}} resizeMode='cover' source={require('../img/7fa5ba4dfdbf1451cca708825bda8160.jpg')} />
              <Image style={{width: ScreenWidth, height: 238}} resizeMode='cover' source={require('../img/ae80f3919238a0a95d6db0be6c41c0d1.jpg')} />
              <Image style={{width: ScreenWidth, height: 238}} resizeMode='cover' source={require('../img/c4696cf98d271da4064a6f654ac9daa6.jpg')} />
            </Carousel>
          ) }
          <View style={styles.movieWrap}>
            {Listsss}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    width: 70,
    height: 100,
  },
  movieWrap: {
  },
  movieItem: {
    flex: 1,
    height: 100,
    marginTop: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imgWrap: {
    width: '50%',
  },
  left: {
    width: 70,
    height: 100,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'flex-start',
  },
  right: {
    height: 100,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  rHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    marginRight: 5,
  },
  loading: {
    flex: 1,
    height: ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
})