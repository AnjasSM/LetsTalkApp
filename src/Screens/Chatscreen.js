import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import firebase from 'firebase';
import User from '../User';


export default class Chatscreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            person: {
                uid: props.navigation.getParam('userId'),
                username: props.navigation.getParam('username'),
                phone: props.navigation.getParam('phone'),
                email: props.navigation.getParam('email'),
                image: props.navigation.getParam('image'),
            },
            textMessage: '',
            messageList: [],
            uid: firebase.auth().currentUser.uid,
        }
    }

    componentWillMount() {
        firebase.database().ref('messages').child(User.uid).child(this.state.person.uid)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if (c.getDay() !== d.getDay()) {
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
        }
        return result;
    }

    sendMessage = async () => {
        if (this.state.textMessage.length > 0) {
            let msgId = firebase.database().ref('messages').child(User.uid).child(this.state.person.uid).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: this.state.uid
            }
            updates['messages/' + User.uid + '/' + this.state.person.uid + '/' + msgId] = message;
            updates['messages/' + this.state.person.uid + '/' + User.uid + '/' + msgId] = message;
            firebase.database().ref().update(updates);
            this.setState({ textMessage: '' });
        }
        console.log('kagak masuk---------------------------------')
    }

    renderRow = ({ item }) => {

        return (
            <View style={[styles.columnChat, {
                alignSelf: item.from === User.uid ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === User.uid ? colors.blue : '#fff',
                marginLeft: item.from === User.uid ? 0 : 20,
                marginRight: item.from === User.uid ? 20 : 0,
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: item.from === User.uid ? 15 : 0,
                borderTopRightRadius: 15,
                borderBottomRightRadius: item.from === User.uid ? 0 : 15,
            }]}>
                <Text style={{ color: item.from === User.uid ? '#fff' : '#000', marginRight: 5, maxWidth: '70%' }}>{item.message}</Text>
                <Text style={{ fontSize: 12, color: '#00000020' }}>{this.convertTime(item.time)}</Text>
            </View>
        )
    }

    render() {
        console.log(`===============================${User.uid}===========${this.state.person.username}`)
        console.log(`-----------------------------${firebase.auth().currentUser.uid}`)
        return (
            <View style={{ height: '100%' }}>
                <View style={styles.header}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginLeft: 20, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.headerLeft} onPress={() => this.props.navigation.navigate('FriendsList')}>
                                <Icon size={33} name='ios-arrow-back' type='ionicon' color='#6EC1BC' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#808080' }}>{this.state.person.username}</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendProfile', this.state.person)}>
                                <Avatar rounded source={{ uri: this.state.person.image }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ marginTop: 10 }}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.textChat}>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        value={this.state.textMessage}
                        onChangeText={(textMessage) => this.setState({ textMessage })}
                        placeholder='Type something'
                        style={styles.textInput}></TextInput>
                    <TouchableOpacity onPress={this.sendMessage}>
                        <Icon size={26} name='send-o' type='font-awesome' color='#6EC1BC' />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: '#FFF',
        height: '10%',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
    },
    headerLeft: {
        borderWidth: 2,
        width: 40,
        borderRadius: 50,
        borderColor: '#6EC1BC'
    },
    headerMid: {
        borderWidth: 2,
        width: 50,
        borderRadius: 10,
        borderColor: '#6EC1BC'
    },
    headerRight: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    },
    columnChat: {
        flexDirection: 'row',
        padding: 15,
        elevation: 5,
        margin: 5
    },
    textChat: {
        flexDirection: 'row',
        marginTop: 0,
        margin: 20,
        height: 50,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        elevation: 5,
        bottom: 0,
        paddingRight: 10,
        paddingLeft: 20,
        width: '90%',
    },
    textInput: {
        fontSize: 16,
        width: '85%',
    }
})
