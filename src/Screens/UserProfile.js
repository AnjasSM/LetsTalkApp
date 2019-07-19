import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../Components/MainHeader';

class UserProfile extends Component {

    state = { currentUser: null }

    render() {
        const { currentUser } = this.state
        return(
            <View>
                <Header 
                    screenLocation = 'FriendList'
                />
                <Text>Hi {currentUser && currentUser.email}!</Text>
            </View>
        )
    }
}

export default UserProfile;