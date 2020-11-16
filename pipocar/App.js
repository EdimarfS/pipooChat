/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import OneSignal from 'react-native-onesignal';




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
        alignSelf:'center',
        justifyContent:'center',
      }}>
        <Text>Pipoo chat </Text>
      </View>
    )
  }


};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
