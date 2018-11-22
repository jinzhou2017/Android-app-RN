import React, { Component } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert } from 'react-native';

export default class Recommend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dengjs: 0,
      hushi: 0,
      qiangfa: 0,
      qiangke: 0,
      chengdu: 0,
      zuizhong: 0,
      kuangbao: 0
    }
    this.handleResult = this.handleResult.bind(this)
  }
  handleResult() {
    const {dengjs, hushi, qiangfa, qiangke, chengdu} = this.state
    if(dengjs < 140) {
      Alert.alert(
        '提示',
        '不支持等级低于140的计算',
        [
          { text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: '确定', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
      return
    }
    const jichu = (dengjs - 140)*160 + 22330
    let zuizhong = Math.ceil(jichu * (1 + qiangfa/100) * (1 + hushi/100) * 1.2 * (1 + qiangke/100/2))
    let kuangbao = zuizhong * 1.5
    if(chengdu !== 0) {
      kuangbao = zuizhong * (1.5 + chengdu/100)
    }
    this.setState({ zuizhong, kuangbao })
  }
  render() {
    const { zuizhong, kuangbao } = this.state
    return (
      <View>
        <ScrollView>
          <Text>等级</Text>
          <TextInput
            onChangeText={(dengjs) => this.setState({ dengjs })}
            value={this.state.dengjs}
          />
          <Text>忽视</Text>
          <TextInput
            onChangeText={(hushi) => this.setState({ hushi })}
            value={this.state.hushi}
          />
          <Text>强法</Text>
          <TextInput
            onChangeText={(qiangfa) => this.setState({ qiangfa })}
            value={this.state.qiangfa}
          />
          <Text>强克</Text>
          <TextInput
            onChangeText={(qiangke) => this.setState({ qiangke })}
            value={this.state.qiangke}
          />
          <Text>程度</Text>
          <TextInput
            onChangeText={(chengdu) => this.setState({ chengdu })}
            value={this.state.chengdu}
          />
          <Button 
            title="计算"
            color="#841584"
            onPress={() => this.handleResult()}/>
          <Text>最终</Text>
          <Text>{zuizhong}</Text>
          <Text>狂暴</Text>
          <Text>{kuangbao}</Text>
        </ScrollView>
      </View>
    );
  }
}
