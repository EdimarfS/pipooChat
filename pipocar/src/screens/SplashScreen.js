  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  Image
} from "react-native";





class  SplashScreen extends Component {


render(){ 
  console.log('SplashScreen');
  return (
    <View style={{
      flex:1,
      justifyContent:'center',
      backgroundColor:'#00ccff'
    }}>
            <View 
            style={{ alignSelf:'center' }}>
            <Text style={{
              fontSize:50,
              fontWeight:'bold',
              color:'#ffffff'
            }}> Pipooooca </Text>
            </View>

    </View>

 
  );
}
}



export  {SplashScreen};
