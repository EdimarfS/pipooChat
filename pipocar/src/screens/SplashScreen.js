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
      backgroundColor:'white'
    }}>
            <View 
            style={{ alignSelf:'center' }}>
            <Text style={{
              fontSize:50,
              fontWeight:'bold',
              color:'#00ccff'
            }}> Pipooooca </Text>
            </View>

    </View>

 
  );
}
}



export  {SplashScreen};
