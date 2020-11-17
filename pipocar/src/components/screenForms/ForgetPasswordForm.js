  
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

class  ForgetPasswordForm extends Component {

render(){ 
  console.log('ForgetPasswordForm');
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
        marginBottom:10,
      }}>
        <Text 
        style={{
          fontWeight:'bold',
          fontSize:30,
        }}>
          Reset your password
        </Text>

      </View>

      <View 
      style={{
        marginTop:5,
        justifyContent:'center',
        alignSelf:'center',
        marginBottom:50,
      }}>
        <Text 
        style={{
          //fontWeight:'bold',
          fontSize:15,
          color:'grey',
          textAlign:'center',
          fontWeight:'bold',
          marginBottom:10,
        }}>
          in case you have forget your password
        </Text>
        <Text 
        style={{
          //fontWeight:'bold',
          fontSize:15,
          color:'grey',
          textAlign:'center'
        }}>
         you can reset a new one, please use your valid email and the link will be send to you
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
        marginBottom:100,
      }}>  
        <Button
        label="Request"
        />
      </View>

      <TouchableOpacity
      onPress={()=>{ Actions.forgetpassword({type:'replace'})}}
      >
      </TouchableOpacity>


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



export default ForgetPasswordForm;
