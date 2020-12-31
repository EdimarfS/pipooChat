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
