import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import Config from "react-native-config";
import User from '../User';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    User.userId = await AsyncStorage.getItem('userId');
    this.props.navigation.navigate(User.userId ? 'App' : 'Auth');
  };

  componentWillMount() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyDIfWsfw-z4P-QuHOxtx7GzXPB_NxlwSEw",
      authDomain: "letstalk-83cf7.firebaseapp.com",
      databaseURL: "https://letstalk-83cf7.firebaseio.com",
      projectId: "letstalk-83cf7",
      storageBucket: "letstalk-83cf7.appspot.com",
      messagingSenderId: "72116847558",
      appId: "1:72116847558:web:105ed1ef9811dec4"
    };
    // Initialize Firebase
    console.log(firebase.apps.length)
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
  }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});