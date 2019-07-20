import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import User from '../User';
import 'firebase/database'

class Register extends Component {
    constructor() {
        super();
        this.getUserLocation();
        this.state = {
            phone: '',
            image: '',
            username: '',
            password: '',
            email: '',
            image: '',
            latitude: 0,
            longitude: 0,
        }
    }

    async getUserLocation() {
        await navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
            },
            (error) => {
                console.warn('Error ' + error.message)
            },
            { enableHighAccuracy: true, maximumAge: 1000, timeout: 200000 }
        )
    }


    _RegisterHandler = () => {
        const emailVer = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        const { email, password, username, phone } = this.state
        if (email === '' && password === '' && username === '' && phone === '') {
            Alert.alert('Input cant Empty')
        } else if (phone.length < 10) {
            Alert.alert('Phone number must more than 10 number')
        } else if (password.length < 6) {
            Alert.alert('Password must more than 6 character')
        } else if (username.length < 5) {
            Alert.alert('Username must more than 6 character')
        } else if (!emailVer.test(email)) {
            Alert.alert('Wrong format email')
        } else {
            this.Register()
            console.log('console from register handle', email, phone, username, password)
        }
    }

    Register = async () => {
        await AsyncStorage.setItem('userEmail', this.state.email);
        User.email = this.state.email;
        User.phone = this.state.phone;
        User.username = this.state.username;
        User.image = 'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png';
        let { email, password } = this.state;
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                ({ user }) =>
                    firebase.database().ref('users/' + user.uid).set({
                        email: this.state.email,
                        status: 'offline',
                        username: this.state.username,
                        password: this.state.password,
                        phone: this.state.phone,
                        image: this.state.image == '' ? 'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png' : this.state.image,
                        location: {
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            city: {
                                name: ''
                            }
                        }

                    })
            )
            .catch(error => {
                let errorCode = error.code;
                let errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak');
                } else {
                    alert(errorMessage);
                }
            })
        this.props.navigation.navigate('Login');
        Alert.alert('Register Successful!')
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.screenTop}>
                    <Image style={styles.imgSize} source={require('../Assets/Image/LetsTalkLogo.jpg')} />
                </View>
                <View style={styles.fontBox}>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={styles.font}>create account</Text>
                    </View>
                    <View style={{ marginLeft: 40, marginRight: 40, marginTop: 10 }}>
                        <TextInput
                            placeholder='Email'
                            style={styles.input}
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        />
                        <TextInput
                            placeholder='Username'
                            style={styles.input}
                            onChangeText={username => this.setState({ username })}
                            value={this.state.username}
                        />
                        <TextInput
                            placeholder='Phone Number'
                            style={styles.input}
                            onChangeText={phone => this.setState({ phone })}
                            value={this.state.phone}
                        />
                        <TextInput
                            placeholder='Password'
                            style={styles.input}
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={{ margin: 40, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.submitBtn} onPress={this._RegisterHandler}>
                            <Text style={styles.submitBtnText}>submit</Text>
                        </TouchableOpacity>
                        <Text style={{ color: '#868686', marginTop: 5 }}>
                            already have an account?
                                <Text onPress={() => this.props.navigation.navigate('Login')} style={{ color: '#7ED3B2' }}>
                                sign in
                                </Text>
                        </Text>
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
    submitBtn: {
        borderWidth: 1,
        borderRadius: 20,
        height: 40,
        width: '70%',
        backgroundColor: '#6EC1BC',
        borderColor: '#6EC1BC'
    },
    submitBtnText: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 5,
        color: 'white'
    }
})

export default Register