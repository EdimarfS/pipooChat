import React, { Component } from "react";
import { 
  View, 
  Text, 
} from "react-native";
import LoginForm from '../components/screenForms/LoginForm';



class  LoginScreen extends Component {




render(){ 
  console.log('LoginScreen');
  return (<LoginForm/>);
}}



export  {LoginScreen};
