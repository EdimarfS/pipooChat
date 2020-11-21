  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
} from "react-native";
import AddProductsForm from '../components/screenForms/AddProductsForm';
class  AddProductsScreen extends Component {

render(){ 
  console.log('AddProducts');
  return (<AddProductsForm/>);
}
}



export  {AddProductsScreen};
