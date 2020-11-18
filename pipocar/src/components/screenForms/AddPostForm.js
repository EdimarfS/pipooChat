  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity,
} from "react-native";
import { 
InputForPosts,
Button
} from '../reusebleComponents/index';
class  AddPostForm extends Component {




render(){ 
  console.log('AddPostForm');
  return (
    <View style={{ marginLeft:10, marginRight:10}}>
      <View>
        <TouchableOpacity
        style={{
          width:100,
          height:100,
          backgroundColor:'red',
          justifyContent:'center',
          alignSelf:'center',
          marginTop:'30%',
        }}>
        </TouchableOpacity>
      </View>
      <View style={{ alignSelf:'center', marginTop:10}}>
      <Text>Description of the picture</Text>
      </View>
      <View>
        <InputForPosts
        maxLength={10}
        
        />
      </View>
      <View style={{
        marginTop:60,
      }}>
        <Button
        label="Post"
        />
      </View>
      


    </View>

 
  );
}
}



export  default AddPostForm;
