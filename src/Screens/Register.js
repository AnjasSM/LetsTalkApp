import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet} from 'react-native';

class Register extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.screenTop}>
                    <Image style={styles.imgSize} source={require('../Assets/Image/LetsTalkLogo.jpg')}/>
                </View>
                <View style={styles.fontBox}>
                    <View style={{alignItems: 'center', marginTop: 10}}>
                        <Text style={styles.font}>create account</Text>
                    </View>
                    <View style={{marginLeft: 40, marginRight: 40, marginTop:30}}>
                        <TextInput placeholder='Email' style={styles.input}/>
                        <TextInput placeholder='Fullname' style={styles.input}/>
                        <TextInput placeholder='Phone Number' style={styles.input}/>
                        <TextInput placeholder='Password' style={styles.input}/>
                    </View>
                    <View style={{margin: 40, alignItems: 'center'}}>
                        <TouchableOpacity style={styles.submitBtn}>
                            <Text style={styles.submitBtnText}>submit</Text>
                        </TouchableOpacity>
                        <Text style={{color:'#868686', marginTop: 5}}>
                            already have an account?
                                <Text onPress={() => this.props.navigation.navigate('Login')} style={{color: '#7ED3B2'}}>
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
        flex:1,
        alignItems: 'center'
    },
    imgSize: {
        width: 200,
        height: 200
    },
    fontBox: {
        flex:2,
        borderWidth: 2,
        elevation: 2,
        borderTopStartRadius: 40,
        borderTopEndRadius:40,
        borderColor: '#f2f2f2'
    },
    font: {
        fontSize:20,
        color: '#868686'
    },
    font2: {
        fontSize:25,
        color: '#59B79B',
        fontWeight: 'bold'
    },
    input: {
        borderBottomWidth:1,
        borderBottomColor: '#9CD1C5',
        width: '100%'
    },
    submitBtn: {
        borderWidth:1,
        borderRadius: 20,
        height:40,
        width: '70%',
        backgroundColor: '#6EC1BC',
        borderColor:'#6EC1BC'
    },
    submitBtnText: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 5,
        color: 'white'
    }
})

export default Register