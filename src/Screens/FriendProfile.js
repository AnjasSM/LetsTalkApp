import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            person: {
                username: props.navigation.getParam('username'),
                email: props.navigation.getParam('email'),
                phone: props.navigation.getParam('phone'),
            },
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View>
                <View style={styles.header}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, marginLeft: 20, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.headerLeft} onPress={() => this.props.navigation.goBack()}>
                                <Icon size={33} name='ios-arrow-back' type='ionicon' color='#6EC1BC' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#808080' }}>{this.state.person.username}</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('FriendProfile')}>
                                <Avatar rounded source={{ uri: this.state.person.image }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.text}>{this.state.person.username}</Text>
                    <Text style={styles.text}>{this.state.person.email}</Text>
                    <Text style={styles.text}>{this.state.person.phone}</Text>
                    <Text onPress={() => this.setModalVisible(true)}>Logout</Text>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View style={styles.blurArea}>
                        <StatusBar backgroundColor="#00000090" barStyle="dark-content" />
                        <View style={styles.alert}>
                            <View style={styles.alertContent}>
                                <Text onPress={() => firebase.auth().signOut()} style={styles.logout}>Logout</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000',
        fontSize: 20,
    },
    logout: {
        backgroundColor: 'red',
        padding: 10,
        color: '#fff',
        bottom: 0,
    },
});