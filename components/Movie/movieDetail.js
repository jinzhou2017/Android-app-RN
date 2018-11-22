import React, { Component } from 'react';
import {  
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView 
} from 'react-native';
import axios from 'axios'
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
import Loading from '../loading'
export default class MovieDetail extends Component {
  constructor(props) {
    super(props)
    this.state= {
      image: '',
      summary: '',
      title: ''
    }
  }
  getMovieDetail() {
    let id = this.props.navigation.getParam('id', 'NO-ID');
    let url = `https://api.douban.com/v2/movie/${id}`
    axios.get(url)
    .then(res => {
      const { alt_title, image, summary } = res.data;
      this.setState({
        title: alt_title,
        summary,
        image
      })
    })
  }
  componentWillMount() {
    this.getMovieDetail()
  }

  render() {
    const { title, summary, image } = this.state
    const Detail = !title ? (<Loading></Loading>):(
      <View style={styles.wrap}>
        <Text>
          {title}
        </Text>
        <View
          style={styles.imgWrap }
        >
          <Image
            style={styles.img}
            resizeMode='contain'
            source={{ uri: image ? image : '' }}
          >
          </Image>
        </View>
        <Text style={styles.summary}>
          简介
        </Text>
        <Text>
          {summary}
        </Text>
      </View>  
    )
    return (
      <View>
        <ScrollView>
          {Detail}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: ScreenHeight/2,
    width: 300,
  },
  imgWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  summary: {
    fontSize: 30,
    color: '#007722'
  },
  wrap: {
    padding: 5,
  }

})
