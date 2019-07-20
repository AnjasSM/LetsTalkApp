import React, { Component } from 'react'
import firebase from 'firebase'
import { GiftedChat } from 'react-native-gifted-chat'
import User from '../User'


export default class DetailChat extends Component {
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

    async componentWillMount() {
            await firebase.database().ref('messages').child(this.state.uid).child(this.state.person.uid)
                .on('child_added', (value) => {
                    this.setState((previousState) => {
                        return {
                            messagesList: GiftedChat.append(previousState.messagesList, value.val()),
                        }
                    })
                    // console.warn(messages)
                })
    }
    sendMessage = async () => {
        if (this.state.text.length > 0) {
            let msgId = firebase.database().ref('messages').child(this.state.uid).child(this.state.person.uid).push().key;
            let updates = {};
            let message = {
                _id: msgId,
                text: this.state.text,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                user: {
                    _id: this.state.uid
                }
            }
            updates['messages/' + this.state.uid + '/' + this.state.person.uid + '/' + msgId] = message;
            updates['messages/' + this.state.person.uid + '/' + this.state.uid + '/' + msgId] = message;
            firebase.database().ref().update(updates)
            this.setState({ text: '' })

        }

        
    }
    render() {
        return (
            <GiftedChat
                text={this.state.textMessage}
                messages={this.state.messageList}
                onSend={this.sendMessage}
                user={{
                    _id: this.state.uid
                }}
                onInputTextChanged={(value) => this.setState({ text: value })}
            />
        )
    }
}