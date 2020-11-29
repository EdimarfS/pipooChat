  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  FlatList,
  TouchableOpacity,
} from "react-native";
import { 
  Input,
  Button

} from '../components/reusebleComponents/index';
import { Actions } from 'react-native-router-flux';
import { Modalize } from 'react-native-modalize';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import SettingForm from '../components/screenForms/SettingForm';


class  SettingScreen extends Component {


render(){ 
  console.log('SettingScreen');
  return (<SettingForm/>)
}

}



export  {SettingScreen};



const styles = {
  listBackground : {
    listBackgroundColor:'red',
  },
  iconStyles : { 
    marginRight:10,
    marginBottom:20,
  }
  
}