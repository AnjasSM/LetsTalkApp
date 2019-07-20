import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

class Header extends Component {

    _Logout = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth')
    }

    render() {
        const {screenLocation} = this.props;
        return (
            <View style={styles.header}>
                <View style={{flex:1,flexDirection: 'row'}}>
                    <View style={{flex:1, marginLeft: 20, justifyContent: 'flex-start', alignItems: 'center',flexDirection: 'row'}}>
                                <TouchableOpacity style={styles.headerLeft} onPress={()=>this.props.navigation.navigate('FriendsList')}>
                                    <Icon size={33} name='ios-arrow-back' type='ionicon' color='#6EC1BC' />
                                </TouchableOpacity>
                    </View>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableOpacity style={styles.headerMid} onPress={()=>this.props.navigation.navigate('Home')}>
                                    <Icon size={40} name='map-marker-multiple' type='material-community' color='#6EC1BC'/>
                                </TouchableOpacity>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={this._Logout}>
                            <Icon size={35} name='logout' type='antdesign' color='#6EC1BC'/>
                        </TouchableOpacity>
                    </View>
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

export default withNavigation(Header);