  
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
class  LoginForm extends Component {




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
          login to your account
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
        marginBottom:100,
      }}>  
        <Button
        label="Login"
        />
      </View>

      <View       
      style={{
        marginBottom:30,
        justifyContent:'center',
        alignSelf:'center',
      }}>  
      <Text 
      style={{
      fontSize:20

      }}>Forget your accout</Text>


      </View>

      <View 
      style={{
        justifyContent:'center',
        alignSelf:'center',
      }}>
      <Text 
      style={{
      fontSize:20,
      textAlign:'center'

      }}>Sign In</Text>
      </View>





    </View>

 
  );
}
}



export default LoginForm;
