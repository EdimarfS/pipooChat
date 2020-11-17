  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  FlatList,
} from "react-native";

class  SettingScreen extends Component {

data = [
{
    account : 'Accout',
    key:1,

    favorite : 'Favorite',
    key:2,

    logout : 'Log Out',
    key:3,
}

]


render(){ 
  console.log('SettingScreen');
  return (
    <FlatList
    style={{ width:'100%', }}
    data={this.data}
    keyExtractor={(item) => item.key}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    renderItem= {({item}) => {

      return(
        <View style={{ marginLeft:10, marginRight:10}}>
          <View
          style={{
            marginTop:40,
          }}
          >
                  <View 
                  style={{
                    marginBottom:50,

                  }}
                  >
                    <Text 
                    style={{
                      fontSize:20,
                      fontWeight:'bold'
                    }}>
                    {item.account}
                    </Text>
                  </View>


                  <View 
                    style={{
                    marginBottom:50,
                    

                  }}>
                    <Text
                    style={{
                      fontSize:20,
                      fontWeight:'bold'
                    }}>{item.favorite}</Text>  
                  </View>


                  <View>
                    <Text 
                    style={{
                      fontSize:20,
                      fontWeight:'bold'
                    }}>{item.logout}</Text>
                    </View>

                    </View>

        </View>

      )}}
    
    
    
    
    />

 
  );
}
}



export  {SettingScreen};



const styles = {
  listBackground : {
    listBackgroundColor:'red',

  }
  
}