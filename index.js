import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import LetsTalkSplash from './src/Screens/LetsTalkSplash';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = { currentScreen : 'tokopediaSplash' };
        setTimeout(()=>{
            this.setState({currentScreen : 'App'});
        },3000);
    }
    render(){
        const {currentScreen} = this.state;
        let screen = currentScreen === 'tokopediaSplash' ? <LetsTalkSplash/> : <App/>; 
        return screen;
    }
}

AppRegistry.registerComponent(appName, () => Main);
