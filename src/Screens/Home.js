import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../Components/MainHeader';
import User from '../User';

class Home extends Component {

    state = { currentUser: null }

    _Logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth')
    }

    render() {
        const { currentUser } = this.state
        return(
            <View>
                <Header 
                    screenLocation = 'Home'
                />
                <Text>{`Hi ${User.email}`}</Text>
                <TouchableOpacity onPress={this._Logout}>
                    <Text style={{fontWeight: 'bold', fontSize: 30, marginTop: 30}}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Home;