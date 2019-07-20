import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, Image  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase';
import { Icon } from 'react-native-elements';
import User from '../User';

export default class FriendsList extends Component {

    constructor() {
        super()
        this.state = {
            users: [],
            username: '',
            phone: '',
            uid: firebase.auth().currentUser.uid
        }
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        User.email = await AsyncStorage.getItem('userEmail');
        User.userId = await AsyncStorage.getItem('userId');
        this.props.navigation.navigate(User.userId ? 'App' : 'Auth');
      };

    componentWillMount() {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.uid = val.key;
            if (person.uid === this.state.uid) {
                    User.uid = this.state.uid
                    User.username = user.username,
                    User.phone = user.phone,
                    User.image = user.image,
                    User.email = user.email,
                    User.data = {
                        username: User.username,
                        phone: User.phone,
                        image: User.image,
                        email: User.email
                    }
            } else {
                this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                })
            }
        })
    }

    // componentWillMount() {
    //     let dbRef = firebase.database().ref('users/' + User.uid + '/message');
    //     dbRef.on('child_added', (val) => {
    //         let person = val.val();
    //         person.uid = val.key;
    //         this.setState((prevState) => {
    //             return {
    //                 users: [...prevState.users, person]
    //             }
    //         })
    //     })

    //     let userRef = firebase.database().ref('users/' + User.uid);
    //     userRef.on('value', (val) => {
    //         let user = val.val();
    //         User.username = user.username,
    //         User.phone = user.phone,
    //         User.image = user.image,
    //         User.email = user.email,
    //         User.data = {
    //             username: User.username,
    //             phone: User.phone,
    //             image: User.image,
    //             email: User.email
    //         }
    //     })
    // }

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity style={{ marginTop: 2}} onPress={() => this.props.navigation.navigate('Chatscreen', item)}>
                <View style={styles.cardMessage}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Image style={{width: 50, height: 50}} source={{uri: item.image}}/>
                        <Text numberOfLines={1}>ini message dong</Text>
                        <Text style={styles.date}>00:00</Text>
                    </View>
                    <Text style={styles.username}>{item.username}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _Logout = async () => {
        await AsyncStorage.clear();
        Alert.alert(`has been Logout sir`)
        this.props.navigation.navigate('Auth')
    }

    render() {
        console.log(firebase.auth().currentUser.uid)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginLeft: 20, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.headerLeft} >
                                <Icon size={40} name='ios-people' type='ionicon' color='#6EC1BC' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                                <Icon size={35} name='map-marker-multiple' type='material-community' color='#6EC1BC' />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={this._Logout}>
                                <Icon size={35} name='logout' type='antdesign' color='#6EC1BC' />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <FlatList
                    data={this.state.users}
                    renderItem={this.renderRow}
                    keyExtractor={(item) => item.uid}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardMessage: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 20,
        paddingTop: 15,
        paddingBottom: 15,
        borderWidth:1,
        borderRadius: 20
    },
    username: {
        fontSize: 13,
        color: '#000',
    },
    date: {
        fontSize: 10,
    },
    header: {
        width: '100%',
        backgroundColor: '#FFF',
        height: '10%',
        elevation:3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
    },
    headerLeft: {
        borderWidth:2,
        width: 50,
        borderRadius: 10,
        borderColor:'#6EC1BC'
    },
    headerMid: {
        borderWidth:2,
        width: 50,
        borderRadius: 10,
        borderColor:'#6EC1BC'
    },
    headerRight: {
        flex:1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    }
})