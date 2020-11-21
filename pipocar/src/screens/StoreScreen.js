  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
} from "react-native";
import UserPersonalEditDataForm from '../components/screenForms/UserPersonalEditDataForm';

class  StoreScreen extends Component {




render(){ 
  console.log('UserPersonalEditDataScreen');
  return (
      <View style={{
          justifyContent:'center',
          alignItems:'center',
          marginTop:'50%',
      }}>
          <Text style={{ fontSize:50}}>StoreScreen</Text>
      </View>
  );
}
}



export  {StoreScreen};
