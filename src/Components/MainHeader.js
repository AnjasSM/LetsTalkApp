import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Avatar } from 'react-native-elements'

class Header extends Component {
    render() {
        return (
            <View style={styles.header}>
                <View style={{flex:1,flexDirection: 'row'}}>
                    <View style={{flex:1, marginLeft: 20, justifyContent: 'flex-start', alignItems: 'center',flexDirection: 'row'}}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('FriendList')}>
                            <Icon size={35} name='ios-people' type='ionicon' color='#6EC1BC' />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={{borderWidth:2, width: 50, borderRadius: 10, borderColor:'#6EC1BC'}} >
                            <Icon size={40} name='map-marker-multiple' type='material-community' color='#6EC1BC'/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
                        <TouchableOpacity>
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
    }
})

export default Header;