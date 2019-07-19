import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from 'react-native-elements'
import { withNavigation } from 'react-navigation';

class Header extends Component {
    render() {
        const {screenLocation} = this.props;
        return (
            <View style={styles.header}>
                <View style={{flex:1,flexDirection: 'row'}}>
                    <View style={{flex:1, marginLeft: 20, justifyContent: 'flex-start', alignItems: 'center',flexDirection: 'row'}}>
                        
                        {
                            screenLocation === 'Home' ? (
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('FriendsList')}>
                                    <Icon size={35} name='ios-people' type='ionicon' color='#6EC1BC' />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.headerLeft} onPress={()=>this.props.navigation.navigate('FriendsList')}>
                                    <Icon size={40} name='ios-people' type='ionicon' color='#6EC1BC' />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        {
                            screenLocation === 'Home' ? (
                                <TouchableOpacity style={styles.headerMid} onPress={()=>this.props.navigation.navigate('Home')}>
                                    <Icon size={40} name='map-marker-multiple' type='material-community' color='#6EC1BC'/>
                                </TouchableOpacity>
                            ):(
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Home')}>
                                    <Icon size={35} name='map-marker-multiple' type='material-community' color='#6EC1BC'/>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('UserProfile')}>
                            <Avatar rounded source={{ uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}/>
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
        height: '28%',
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