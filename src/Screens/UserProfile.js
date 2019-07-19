import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../Components/MainHeader';

class UserProfile extends Component {

    _Logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth')
    }

    render() {
        return(
            <View>
                <View>
                <Header 
                    screenLocation = 'Home'
                />
                <Text>{`Hi ${User.email}`}</Text>
                <TouchableOpacity onPress={this._Logout}>
                    <Text style={{fontWeight: 'bold', fontSize: 30, marginTop: 30}}>Logout</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

export default UserProfile;