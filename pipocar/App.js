LogBox.ignoreLogs([
  //'ListView is deprecated',
 // 'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
  //"Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?",
  //'Animated: `useNativeDriver`',
 // 'Setting a timer'
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
   // 'Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.'
])
import React, { Component } from 'react';
import {
  View,
  Text,
  LogBox,
  StatusBar
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import { 
  IntroductionScreen, 
  LoginScreen, 
  SignScreen, 
  UserPersonalEditDataScreen,
  UserPersonalDataScreen,
  SettingScreen,
  ChatScreen,
  AddPostScreen,
  SplashScreen
} from './src/screens';
import './src/fixtimerbug';
import SignForm from './src/components/screenForms/SignForm';
import SplashLoading from './src/screens/SplashLoadingCounter';
import Router from './src/router/Router';
import auth from '@react-native-firebase/auth';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Reducers from './src/reducers/index';
//import Example from '../pipocar/src/screens/Example';
//import { Router } from 'react-native-router-flux';
//import { IntroductionScreen } from './src/screens';
//import Router from './src/router/Router';

//OneSignal ID : 751410b2-8b48-456d-9034-27161bc1a717


class  App extends Component{

  constructor(props)
  {
    super(props)
    {
      this.state = {
        loading:false,
      }
    }
  }


    UNSAFE_componentWillMount()
    {
        StatusBar.setHidden(true);
        OneSignal.init('9f18c05f-885a-4168-bd3f-bae752dfe31c');
        OneSignal.addEventListener('opened', this.onOpened);
    }

    onOpened = (result) =>
    {
      console.log('Messagem: ', result.notification.payload.body);
      console.log('Result: ', result);
    }

    componentDidMount()
    {
      OneSignal.removeEventListener('opened', this.onOpened) 
      if(!this.state.loading)
      {    
        SplashLoading.load(app => this.setState({ loading: true}));
      }

    }




  render()
  {

    const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
    store.subscribe(() =>{
      console.log("NEW STATE!")
    })

    return(


      <Provider store={store}>
          {this.state.loading ? <Router/> : <SplashScreen/>}
      </Provider>



    )
  }


};


export default App;
