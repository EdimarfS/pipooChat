  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text,
  TouchableOpacity
} from "react-native";
import  { 
Input,
} from '../components/reusebleComponents/index';



class  ChatScreen extends Component {




render(){ 
  console.log('ChatScreen');
  return (
    <View style={styles.container}>
      <View 
      style={{
        justifyContent:'center',
      // alignSelf:'center'

      }}>
        <Text 
        style={{
          fontSize:58,
          fontWeight:'bold'
        }}>
          Chat
        </Text>
        <Input
        placeholder="search a group or business..."
        
        />

      </View>

      <View 
      style={{
        marginTop:'22%',
        flexDirection:'row',
        justifyContent:'flex-end'

      }}>
        <TouchableOpacity style={{
          width:100,
          height:50,
          marginRight:10,
         // backgroundColor:'white',
          borderWidth:0.3
        }}>

        </TouchableOpacity>

        <TouchableOpacity 
        style={{
          width:100,
          height:50,
          marginRight:10,
          //backgroundColor:'white',
          borderWidth:0.3
        }}>

        </TouchableOpacity>
      </View>

    </View>

 
  );
}
}



export  {ChatScreen};


const styles = {

  container:{
    flex:1,
  //  justifyContent:'center',
   // alignSelf:'center'

  }
}