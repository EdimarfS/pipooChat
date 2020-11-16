  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
} from "react-native";

import UserPersonalDataForm from '../components/screenForms/UserPersonalDataForm';

class  UserPersonalDataScreen extends Component {


render(){ 
  console.log('UserPersonalDataScreen');
  return (<UserPersonalDataForm/>);
}
}



export default UserPersonalDataScreen;
