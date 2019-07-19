import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import Header from '../Components/MainHeader';
import User from '../User';

class FriendsList extends Component {

    state = {
        users: []
    }

    componentWillMount() {
        let dbRef = firebase.database().ref('users/' + User.uid + '/message');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.uid = val.key;
            this.setState((prevState) => {
                return {
                    users: [...prevState.users, person]
                }
            })
        })
        let userRef = firebase.database().ref('users/' + User.uid);
        userRef.on('value', (val) => {
            let user = val.val();
            User.username = user.username,
                User.phone = user.phone,
                User.image = user.image,
                User.email = user.email,
                User.data = {
                    name: User.name,
                    phone: User.phone,
                    avatar: User.avatar,
                    email: User.email
                }
        })
    }

    _Logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth')
    }


    render() {
        const { currentUser } = this.state
        return (
            <View>
                <Header
                    screenLocation='FriendList'
                />
                <View></View>
                <Text>{`Hi ${User.email}`}</Text>
                <TouchableOpacity onPress={this._Logout}>
                    <Text style={{ fontWeight: 'bold', fontSize: 30, marginTop: 30 }}>Logout</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default FriendsList;