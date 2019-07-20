import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'firebase';
import User from '../User';
import Geolocation from '@react-native-community/geolocation';
Geolocation.getCurrentPosition(info => console.log(info));

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: -7.755705,
            longitude: -249.621202,
            error: null,
        }
        // this.getLocation()
    }

    // updateStatus = async () => {
    //     await firebase.database().ref('users/' + user.id)
    //         .onDisconnect().update({
    //             status: 'offline'
    //         })
    // }

    // getLocation = async () => {
    //     await Geolocation.getCurrentPosition(
    //         (position) => {
    //             this.setState({
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //                 error: null,
    //             });
    //         },
    //         (error) => this.setState({ error: error.message }),
    //         { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    //     );
    // }

    // updateLocation = async () => {
    //     if (this.state.latitude) {
    //         await firebase.database().ref('users/' + user.id).update({
    //             latitude: this.state.latitude,
    //             longitude: this.state.longitude,
    //             status: 'online'
    //         })
    //     }
    // }

    async componentWillMount() {
        let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', async (val) => {
            let person = val.val();
            person.uid = val.key;
            if (person.uid === User.uid) {
                User.username = person.username;
                User.phone = person.phone;
                User.image = person.image;
                User.email = person.email;
                User.latitude = person.location.latitude;
                User.longtitude = person.location.longitude;
                User.data = {
                    username: User.username,
                    phone: User.phone,
                    image: User.image,
                    email: User.email
                };
            }
        }
        )
    }

    //     componentDidMount() {
    //     navigator.geolocation.getCurrentPosition(
    //        (position) => {
    //          console.log("wokeeey");
    //          console.log(position);
    //          this.setState({
    //            latitude: position.coords.latitude,
    //            longitude: position.coords.longitude,
    //            error: null,
    //          });
    //        },
    //        (error) => this.setState({ error: error.message }),
    //        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    //      );
    //    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={{ flex: 1, zIndex: 2, position: "absolute", left: 100 }} onPress={() => this.props.navigation.navigate('FriendsList', User.data)}>
                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 50, elevation: 5 }}>
                        <Image source={require('../Assets/Image/friends.png')} style={{ width: 30, height: 30 }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, zIndex: 2, position: "absolute" }} onPress={() => this.props.navigation.navigate('Profile', User.data)}>
                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 50, elevation: 5 }}>
                        <Image source={require('../Assets/Image/5a37557e4fbdf2.2249791115135758063266.png')} style={{ width: 30, height: 30 }} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, zIndex: 2, position: "absolute", right: 100 }} onPress={() => this.props.navigation.navigate('UserProfile', User.data)}>
                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 50, elevation: 5 }}>
                        <Image source={require('../Assets/Image/profile.png')} style={{ width: 30, height: 30 }} />
                    </View>
                </TouchableOpacity>
                {/* <MapView style={styles.map}
                    initialRegion={{
                        latitude: -7.755705,
                        longitude: -249.621202,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }} /> */}

                <MapView style={styles.map} initialRegion={{
                    latitude: -7.755705,
                    longitude: -249.621202,
                    latitudeDelta: 1,
                    longitudeDelta: 1
                }}>
                    <TouchableOpacity>
                        {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                            coordinate={{ "latitude": this.state.latitude, "longitude": this.state.longitude }}
                            title={User.email}
                        />}
                    </TouchableOpacity>


                </MapView>
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
        zIndex: 100,
        marginBottom: 560,
        elevation: 3,
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