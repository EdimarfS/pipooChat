  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity,
} from "react-native";
import { 
  Input,
  Button,
} from '../reusebleComponents/index';

class  
UserPersonalDataForm extends Component {




render(){ 
  console.log('LoginForm');
  return (
    <View 
    style={{
      marginLeft:10,
      marginRight:10,

    }}>  
    

    
        <TouchableOpacity            
        style={{
            marginTop:10,
            marginBottom:20,
             width:150,
             height:150,
             borderRadius:100,
             alignSelf:'center',
             backgroundColor:'lightgrey',
           }}>


        </TouchableOpacity>







      <View 
      style={{
        marginBottom:70,
      }}>  
        <Input
      
        placeholder="Username"
        />
      </View>
      <View 
      style={{
        marginBottom:70,
      }}>  
        <Input
      
        placeholder="ID"
        />
      </View>
      <View 
      style={{
        marginBottom:70,
      }}>  
        <Input
        placeholder="Bio"
        multiline={true}
        maxLength={40}
        />
      </View>
      <View 
      style={{
        marginBottom:70,
      }}>  
        <Input
        placeholder="Mantra"
        secureTextEntry
        />
      </View>

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

      }}> Finish </Text>


      </View>


   





    </View>

 
  );
}
}



export default UserPersonalDataForm;
