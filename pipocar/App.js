import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import OneSignal from 'react-native-onesignal';
//import Router from './src/router/Router';

//OneSignal ID : 751410b2-8b48-456d-9034-27161bc1a717


class  App extends Component{

    UNSAFE_componentWillMount()
    {
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
      <View style={{
        flex:1,
        justifyContent:'center',
        alignContent:'center',


      }}>
          <Text>Hello App</Text>
      </View>
    )
  }


};


export default App;
