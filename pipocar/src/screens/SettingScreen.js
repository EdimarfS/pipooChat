  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  FlatList,
  TouchableOpacity
} from "react-native";
import { Actions } from 'react-native-router-flux';

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

onLogoutPRESSED = () =>{
    Actions.auth({type:'replace'});
}


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
                  <TouchableOpacity>    
                  <View 
                  style={{
                    marginBottom:50,
                    flexDirection:'row'

                  }}
                  >
                    <View style={styles.iconStyles}>
                    <Text>Icon</Text>

                    </View>
                    <Text 
                    style={{
                      fontSize:25,
                      fontWeight:'bold'
                    }}>
                    {item.account}
                    </Text>
                  </View>
                  </TouchableOpacity>

                  <TouchableOpacity>
                  <View 
                    style={{
                    marginBottom:50,
                    flexDirection:'row'
                    

                  }}>
                    <View style={styles.iconStyles}>
                    <Text>Icon</Text>
                    </View>
                    <Text
                    style={{
                      fontSize:25,
                      fontWeight:'bold'
                    }}>{item.favorite}</Text>  
                  </View>
                  </TouchableOpacity>

                  <TouchableOpacity 
                  onPress={this.onLogoutPRESSED.bind(this)}>
                  <View
                  style={{
                    marginBottom:50,
                    flexDirection:'row'
                  }}
                  >
                    <View style={styles.iconStyles}>
                    <Text>Icon</Text>
                    </View>
                    <Text 
                    style={{
                      fontSize:25,
                      fontWeight:'bold'
                    }}>{item.logout}</Text>
                    </View>
                    </TouchableOpacity>

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
  },
  iconStyles : { 
    marginRight:10,
  }
  
}