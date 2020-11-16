  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
} from "react-native";
import SignForm from '../components/screenForms/SignForm';

class  SignScreen extends Component {




render(){ 
  console.log('SignScreen');
  return (<SignForm/>);
}
}



export  {SignScreen};
