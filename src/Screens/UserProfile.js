import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import firebase from 'firebase';
import User from '../User';
import { Container, Header, Left, Body, Right } from 'native-base';

export default class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: User.username,
            phone: User.phone,
            image: User.image,
            status: User.status,
            email: User.email,
            modalVisible: false
        }
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    modalHandler = () => {
        this.setState({ modalVisible: true })
    }

    updateUser = async () => {
        const { username, phone, image, email } = this.state; // state destruction
        if (username !== '' && phone != "" && image != "" ) {
            firebase.database()
                .ref('users/' + User.uid)
                .update({ username: username, phone: phone, image: image, status: status })
                .then(() => {
                    Alert.alert('Data has been changed !');
                    User.username = username;
                    User.email = email;
                    User.phone = phone;
                    User.image = image;
                    this.setState({ modalVisible: false })
                })
                .catch(() => {
                    Alert.alert('wrong data input!')
                })
        } else {
            Alert.alert('Input cant empty!');
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    _Logout = async () => {
        await AsyncStorage.clear();
        Alert.alert(`has been Logout sir`)
        this.props.navigation.navigate('Auth')
    }


    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: 'white', borderRadius: 20, height: 70 }}>
                    <Left style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Text>Back</Text>
                        </TouchableOpacity>
                    </Left>
                    <Body style={{ flex: 0 }}>
                        <View>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>User Profile</Text>
                        </View>
                    </Body>
                    <Right>
                    <TouchableOpacity onPress={() => this._Logout}>
                            <Text>Log Out</Text>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View >
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible === undefined ? false : this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={[styles.containerModal, { backgroundColor: 'rgba(118, 122, 77, 0.12)' }]}>
                            <View style={styles.textInput}>
                                <View style={{ alignSelf: 'center', top: 10 }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Edit profile</Text>
                                </View>
                                <View style={{ top: 15 }}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Username'
                                        value={this.state.username}
                                        onChangeText={this.handleChange('username')}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Phone Number'
                                        value={this.state.phone}
                                        onChangeText={this.handleChange('phone')}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Image URL'
                                        value={this.state.image}
                                        onChangeText={this.handleChange('image')}
                                    />
                                    <TouchableOpacity
                                        style={[styles.buttonModal, { alignSelf: 'flex-start', backgroundColor: '#DA2C38' }]}
                                        onPress={() => { this.setModalVisible(!this.state.modalVisible) }}>
                                        <Text style={styles.textButton}>Close</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.buttonModal, styles.buttonRightModal]}
                                        onPress={this.updateUser}>
                                        <Text style={styles.textButton}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.header}></View>
                    <Image style={styles.avatar} source={{ uri: this.state.image }} />
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <TouchableOpacity style={styles.buttonEdit} onPress={() => this.modalHandler()}>
                                <Text>Edit</Text>                             
                            </TouchableOpacity>
                            <Text style={styles.username}>{this.state.username}</Text>
                            <Text style={styles.info}>{this.state.phone} / {this.state.email}</Text>
                        </View>
                    </View>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#ff3300",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 130
    },
    username: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    buttonEdit: {
        right: '10%',
        alignSelf: 'flex-end',
        height: 30,
        borderWidth:3,
        width: 50,
        borderRadius: 20,
        borderColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
    },
    username: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
    containerModal: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%'
    },
    textInput: {
        backgroundColor: '#a6a6a6',
        width: "100%",
        padding: 10,
        elevation: 3,
        borderRadius: 5
    },
    input: {
        height: 40,
        backgroundColor: '#fff',
        color: '#000',
        fontFamily: 'Source Sans Pro',
        borderColor: '#d7acc2',
        marginBottom: 10,
        borderRadius: 17,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        marginTop: 10
    },
    buttonModal: {
        height: 30,
        width: 100,
        backgroundColor: '#f7c744',
        marginBottom: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        alignSelf: 'flex-end'
    },
    buttonRightModal: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#66ff33'
    },
    textButton: {
        color: 'black',
        fontWeight: 'bold',
        alignSelf: 'center',
        top: 5
    },

    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
});