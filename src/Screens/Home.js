import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';
import Header from '../Components/MainHeader';
import User from '../User';

class Home extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={{flex:1, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('FriendsList')} style={{borderWidth:2, width: '30%'}} >
                            <Icon size={35} name='ios-people' type='ionicon' color='#6EC1BC' style={{zIndex: 200}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    header: {
        backgroundColor: '#FFF',
        width: '100%',
        height: '28%',
        zIndex:100,
        marginBottom: 560,
        elevation:3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
    }
})

export default Home;