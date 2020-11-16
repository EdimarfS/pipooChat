import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import { IntroductionScreen, LoginScreen, SignScreen } from './src/screens';
import './src/fixtimerbug';
import SignForm from './src/components/screenForms/SignForm';
//import { Router } from 'react-native-router-flux';
//import { IntroductionScreen } from './src/screens';
//import Router from './src/router/Router';

//OneSignal ID : 751410b2-8b48-456d-9034-27161bc1a717


class  App extends Component{

    UNSAFE_componentWillMount()
    {
        StatusBar.setHidden(true);
        OneSignal.init('9f18c05f-885a-4168-bd3f-bae752dfe31c');
        OneSignal.addEventListener('opened', this.onOpened) 
    }

    onOpened = (result) =>
    {
      console.log('Messagem: ', result.notification.payload.body);
      console.log('Result: ', result);
    }

    componentDidMount()
    {
      OneSignal.removeEventListener('opened', this.onOpened) 

    }




  render()
  {
    return(
      <LoginScreen/>
    )
  }


};


export default App;
