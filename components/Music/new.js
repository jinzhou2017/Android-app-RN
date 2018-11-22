import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions 
} from 'react-native';
import axios from 'axios';

import Loading from '../loading'

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
let imgWidth = (ScreenWidth - 40)/2
export default class New extends Component {
  constructor(props) {
    super(props)
    this.state = {
      songLists: [],
    }
  }
  getNewMusic({ num = 10, name}) {
    const url =  `http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n=${num}&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w=${name}`;
    axios.get(url)
    .then(res => {
      //alert(res.data.data)
      const { list } = res.data.data.song
      this.setState({
        songLists: list
      })
    })
  }
  getMusicImage(f, width) {
    let image_id = f.split('|')[4]
    let url = `http://imgcache.qq.com/music/photo/album_${width}/${image_id%100}/${width}_albumpic_${image_id}_0.jpg`
    return url;
  }
  componentWillMount() {
    this.getNewMusic({
      name: '周杰伦'
    })
  }
  render() {
    const {songLists } = this.state
    const SongList = songLists.length === 0 ? (
      <Loading></Loading>
    ) : (
      songLists.map(song => (
        < View key={song.docid} style={styles.songItem}> 
          <Image
            style={styles.logo}
            key={song.f}
            resizeMode='contain'
            source={{ uri:this.getMusicImage(song.f, '300') }}
          >
          </Image>
          <Text>
            {
              song.fsong
            }
          </Text>
        </View>
      ))
    )
    return (
      <View>
        <ScrollView>
          <View style={ styles.songWrap}>
            {SongList}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  logo: {
    width: imgWidth,
    height: 100,
    borderRadius: 20,
  },
  songWrap: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  songItem: {
    margin: 5,
    alignItems: 'center',
  }
})