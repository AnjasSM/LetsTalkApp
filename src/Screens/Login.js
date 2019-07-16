import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet} from 'react-native';

class Login extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <View style={styles.screenTop}>
                    <Image style={styles.imgSize} source={require('../Assets/Image/LetsTalkLogo.jpg')}/>
                </View>
                <View style={styles.fontBox}>
                    <View style={{alignItems: 'center', marginTop: 10}}>
                        <Text style={styles.font}>what a lovely day</Text>
                        <Text style={styles.font}>to talk with some</Text>
                        <Text style={styles.font2}>friend's</Text>
                    </View>
                    <View style={{marginLeft: 40, marginRight: 40, marginTop:30}}>
                        <TextInput placeholder='Email' style={styles.input}/>
                        <TextInput placeholder='Password' style={styles.input}/>
                    </View>
                    <View style={{margin: 40, alignItems: 'center'}}>
                        <TouchableOpacity style={styles.signinBtn}>
                            <Text style={styles.signinBtnText}>sign in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signupBtn} onPress={()=> this.props.navigation.navigate('Register')}>
                            <Text style={styles.signupBtnText}>create account</Text>
                        </TouchableOpacity>
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
    signinBtn: {
        borderWidth:1,
        borderRadius: 20,
        height:40,
        width: '70%',
        backgroundColor: '#6EC1BC',
        borderColor:'#6EC1BC'
    },
    signupBtn: {
        borderWidth:1,
        borderRadius: 20,
        height:40,
        width: '70%',
        borderColor: '#6EC1BC',
        marginTop:30
    },
    signinBtnText: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 5,
        color: 'white'
    },
    signupBtnText: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 5,
        color: '#6EC1BC'
    }


})

export default Login