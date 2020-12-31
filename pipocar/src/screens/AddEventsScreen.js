import React, { Component } from "react";
import { 
  View, 
  Text, 
} from "react-native";
import AddEventsForm from '../components/screenForms/AddEventsForm';
class  AddEventsScreen extends Component {

render(){ 
  console.log('AddProducts');
  return (<AddEventsForm/>);
}
}



export  {AddEventsScreen};
