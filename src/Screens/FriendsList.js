import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { Avatar } from 'react-native-elements';
import BasicHeader from '../Components/BasicHeader';

export default  class FriendList extends Component {
    render() {
        return (
            <View>
                <BasicHeader />
                <View style={{flex: 1, borderWidth: 2, flexDirection: 'row'}}>
                    <ScrollView>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                        <View><Text>user 1</Text></View>
                    </ScrollView>
                </View>
            </View>
        )
    }
}