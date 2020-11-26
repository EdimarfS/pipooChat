  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text,
  TouchableOpacity,
} from "react-native";

import { 
  Button
} from '../components/reusebleComponents/index';
import { 
  Actions
  } from 'react-native-router-flux';

class  IntroductionScreen extends Component {




render(){ 
  console.log('IntroductionScreen');
  return (
    <View style={{
      marginLeft:10,
      marginRight:10,
    }}>

      <View style={{
        justifyContent:'center',
        alignSelf:'center',
        marginTop:'40%',
      }}>
        <Text style={{
          fontSize:50,
          marginBottom:'20%',
          fontWeight:'bold',
          color:'#05c7fc'
        }}> pipoca</Text>

      </View>
      <View 
      style={{ 
        marginBottom:70,
      }}
      >
        <Button
        onPress={()=>{ Actions.sign({type:'replace'})}}
        label="Create an account"
        />
      </View>
      <View style={{ 
        marginBottom:60, 
        justifyContent:'center',
        alignItems:'center'
        }}>
        <TouchableOpacity onPress={()=>{ Actions.login({type:'replace'})}}>
          <Text
          style={{
           // fontWeight:'bold',
            fontSize:19,
            fontWeight:'bold'
          }}
          >Login</Text>
        </TouchableOpacity>
      </View>

    </View>

 
  );
}
}



export  {IntroductionScreen};
