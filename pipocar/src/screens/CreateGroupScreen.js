import React, { Component } from "react";
import { 
  View, 
  Text, 
} from "react-native";
import CreateGroupForm from '../components/screenForms/CreateGroupForm';

class  CreateGroupScreen extends Component {




render(){ 
  console.log('CreateGroupScreen');
  return (<CreateGroupForm/>);
}
}



export  {CreateGroupScreen};
