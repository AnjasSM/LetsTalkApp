import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import User from '../User';

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    _LoginHandler = async () => {
        const { email, password } = this.state;
        const emailVer = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        if (email === '' && password === '') {
            Alert.alert('Email and Password cant empty')
        } else if (!emailVer.test(email)) {
            Alert.alert('Wrong email format')
        } else {
            await AsyncStorage.setItem('userEmail', email)
            this.Login()
        }
    }

    Login = async () => {
        const { email, password } = this.state;
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (response) => {
                User.userId = response.user.uid;
                User.email = this.state.email;
                await AsyncStorage.setItem('userId', response.user.uid);
                this.props.navigation.navigate('App');
            }).catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode === 'auth/wrong-password') {
                    Alert.alert('Wrong password.');
                } else {
                    Alert.alert(errorMessage);
                }
            });
    }

    // componentWillMount() {
    //     AsyncStorage.getItem('userEmail').then(val=>{
    //         if(val) {
    //             this.setState({email:val})
    //         }
    //     })
    // }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.screenTop}>
                    <Image style={styles.imgSize} source={require('../Assets/Image/LetsTalkLogo.jpg')} />
                </View>
                <View style={styles.fontBox}>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={styles.font}>what a lovely day</Text>
                        <Text style={styles.font}>to talk with some</Text>
                        <Text style={styles.font2}>friend's</Text>
                    </View>
                    <View style={{ marginLeft: 40, marginRight: 40, marginTop: 30, position: 'relative' }}>
                        <TextInput
                            placeholder='Email'
                            style={styles.input}
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        />
                        <TextInput
                            placeholder='Password'
                            style={styles.input}
                            onChangeText={password => this.setState({ password })}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{ margin: 40, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.signinBtn} onPress={this._LoginHandler}>
                            <Text style={styles.signinBtnText}>sign in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signupBtn} onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={styles.signupBtnText}>create account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screenTop: {
        flex: 1,
        alignItems: 'center'
    },
    imgSize: {
        width: 200,
        height: 200
    },
    fontBox: {
        flex: 2,
        borderWidth: 2,
        elevation: 2,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
        borderColor: '#f2f2f2'
    },
    font: {
        fontSize: 20,
        color: '#868686'
    },
    font2: {
        fontSize: 25,
        color: '#59B79B',
        fontWeight: 'bold'
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#9CD1C5',
        width: '100%'
    },
    signinBtn: {
        borderWidth: 1,
        borderRadius: 20,
        height: 40,
        width: '70%',
        backgroundColor: '#6EC1BC',
        borderColor: '#6EC1BC'
    },
    signupBtn: {
        borderWidth: 1,
        borderRadius: 20,
        height: 40,
        width: '70%',
        borderColor: '#6EC1BC',
        marginTop: 30
    },
    signinBtnText: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 5,
        color: 'white'
    },
    signupBtnText: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 5,
        color: '#6EC1BC'
    }


})

export default Login