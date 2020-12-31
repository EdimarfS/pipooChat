import React, { Component } from "react";
import { 
  View, 
  Text, 
} from "react-native";
import AddPostForm from '../components/screenForms/AddPostForm';
class  AddPostScreen extends Component {

render(){ 
  console.log('AddPostScreen');
  return (<AddPostForm/>);
}
}



export  {AddPostScreen};
