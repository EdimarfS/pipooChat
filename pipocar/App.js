import React, { Component } from 'react';
import {
  View,
  Text,
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
  AddPostScreen
} from './src/screens';
import './src/fixtimerbug';
import SignForm from './src/components/screenForms/SignForm';
//import SplashLoading from './src/screens/SplashLoadingCounter';
import Router from './src/router/Router';
import auth from '@react-native-firebase/auth';
import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Reducers from './src/reducers/index';

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
/*       if(!this.state.loading)
      {    
        SplashLoading.load(app => this.setState({ loading: true}));
      }
 */
    }




  render()
  {

    const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk));
    store.subscribe(() =>{
      console.log("NEW STATE!")
    })

    return(


      <Provider store={store}>
              <AddPostScreen/>
      </Provider>



    )
  }


};


export default App;
