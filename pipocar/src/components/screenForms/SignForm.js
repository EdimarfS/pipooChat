  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity
} from "react-native";
import { 
  Input,
  Button
} from '../reusebleComponents/index';
import { 
  Actions
  } from 'react-native-router-flux';

class  SignForm extends Component {




render(){ 
  console.log('LoginForm');
  return (
    <View 
    style={{
      marginLeft:10,
      marginRight:10,

    }}>  
      <View 
      style={{
        marginTop:50,
        justifyContent:'center',
        alignSelf:'center',
        marginBottom:40,
      }}>
        <Text 
        style={{
          fontWeight:'bold',
          fontSize:30,
        }}>
          create an account
        </Text>

      </View>
      <View 
      style={{
        marginBottom:70,
      }}>  
        <Input
      
        placeholder="email"
        />
      </View>
      <View 
      style={{
        marginBottom:70,
      }}>  
        <Input
        placeholder="password"
        secureTextEntry
        />
      </View>
      <View       
      style={{
        marginBottom:80,
      }}>  
        <Button
        label="create an account"
        />
      </View>

      <TouchableOpacity 
      onPress={()=>{ Actions.login({type:'replace'})}}
      >
      <View       
      style={{
        marginBottom:30,
        justifyContent:'center',
        alignSelf:'center',
        backgroundColor:'#44e300',
        width:'100%',
        height:60,
        borderRadius:5,
      }}>  
      <Text 
      style={{
      fontSize:20,
      textAlign:'center',
      color:'white',
      fontWeight:'bold'

      }}>I have an account</Text>


      </View>
      </TouchableOpacity>





    </View>

 
  );
}
}



export default SignForm;
