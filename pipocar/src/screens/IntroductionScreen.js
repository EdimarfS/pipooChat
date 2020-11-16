  
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
          fontSize:40,
          marginBottom:'30%',
        }}> welcome</Text>

      </View>
      <View 
      style={{ 
        marginBottom:70,
      }}
      >
        <Button
        label="Create an account"
        />
      </View>
      <View style={{ 
        marginBottom:60, 
        justifyContent:'center',
        alignItems:'center'
        }}>
        <TouchableOpacity>
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
