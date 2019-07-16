import React, { Component } from 'react';
import { View, Image, StatusBar } from 'react-native';

export default class TokopediaSpash extends Component {
    render() {
        return (
            <View style={{backgroundColor:'#ffffff', flex:1, alignSelf: 'stretch'}}>
                <Image style={{alignSelf:'center', zIndex:100, width:230, height:213, marginTop: '50%'}} source={require('../Assets/Image/Logowithtagline.jpg')}/>
                <StatusBar backgroundColor='#ffffff' barStyle="light-content" />
            </View>
        )
    }
}