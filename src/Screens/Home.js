import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../Components/MainHeader';

class Home extends Component {

    state = { currentUser: null }

    render() {
        const { currentUser } = this.state
        return(
            <View>
                <Header />
                <Text>Hi {currentUser && currentUser.email}!</Text>
            </View>
        )
    }
}

export default Home;