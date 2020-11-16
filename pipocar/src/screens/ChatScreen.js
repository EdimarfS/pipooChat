  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020

 
import React, { Component } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  ScrollView, 
  Image
} from "react-native";
//import firebase from 'firebase';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Actions } from "react-native-router-flux";
import { Input } from '../components/reusebleComponents/index';
import Lottie from 'lottie-react-native';
import ImageBlurLoading from 'react-native-image-blur-loading'



class  ChatScreen extends Component {




render(){ 
  return (
    <View
    //showsVerticalScrollIndicator={false}
     style={{
      flex:1,
   //   backgroundColor:'red'
    }}>

    


    </View>

 
  );
}
}



export  {ChatScreen};


const styles = {
  GroupsName:{
    fontSize:20,
    fontWeight:'bold',
    color:'black'
  },
  lastestMessageStyles:{
  color:'black', 
  fontSize:10,
  },
  currentUserStyle: {
    color:'black', 
    fontWeight:'bold',


  },
  avatarStyle:{
     backgroundColor:'grey', 
  },
  nameAvatar:{
    fontWeight:'bold',
    fontSize:20,
  },
  latestMessageAvatar:{
   color:'grey',
    fontSize:11,
  },
  lottieStyle : {
    // flex:1,
    //  width:100, //--> Problem
    height:100,
     // alignSelf:'center',
    //justifyContent:'center', 


   // marginTop:20,
   // marginLeft:5,  

  }
  
}