import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'

class BasicHeader extends Component {
    render() {
        const { screenPosition } = this.props
        return (
            <View style={styles.header}>
                <View style={{flex:1,flexDirection: 'row'}}>
                    <View style={{flex:1, marginLeft: 10, justifyContent: 'flex-start', alignItems: 'center',flexDirection: 'row'}}>
                        <TouchableOpacity>
                            <Icon size={35} name='arrowleft' type='antdesign' color='#6EC1BC' />
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{borderWidth:2, width: 50, borderRadius: 10, borderColor:'#6EC1BC'}} >
                            {
                                screenPosition === 'friendlist' ? (<Text>friend list</Text>) : (<Text>User Profile</Text>)
                            }
                        </View>
                    </View>
                    <View style={{flex:1, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
                        <TouchableOpacity>
                            {
                                screenPosition === 'friendlist' ? (<Icon size={35} name='dots-three-horizontal' type='entypo' color='#6EC1BC' />) : (<Text></Text>)
                            }
                                                       
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

export default BasicHeader;