  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
} from "react-native";
import UserPersonalEditDataForm from '../components/screenForms/UserPersonalEditDataForm';

class  UserPersonalEditDataScreen extends Component {




render(){ 
  console.log('UserPersonalEditDataScreen');
  return (<UserPersonalEditDataForm/>);
}
}



export  {UserPersonalEditDataScreen};
