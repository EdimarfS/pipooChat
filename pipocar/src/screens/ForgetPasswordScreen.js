import React, { Component } from "react";
import { 
  View, 
  Text, 
} from "react-native";

import ForgetPasswordForm from '../components/screenForms/ForgetPasswordForm';
class  ForgetPasswordScreen extends Component {




render(){ 
  console.log('ForgetPasswordScreen');
  return (<ForgetPasswordForm/>);
}
}



export  {ForgetPasswordScreen};
