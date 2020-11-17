  
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
import { Modalize } from 'react-native-modalize';

class  SettingScreen extends Component {
  
  
  constructor(props)
  {
    super(props)

    this.modalizeAccountRef = React.createRef();

    this.modalizeFavoritetRef = React.createRef();


  }
//Modalize

        //Open Modal
onAccountOPEN()
    {
        this.modalizeAccountRef.current?.open();
    }
    //Close Modal
onCloseAccount()
    {
        this.modalizeAccountRef.current?.close();
    }
onOverlayPress = () => { 
      this.onCloseAccount();
    }


onCloseFavorite()
    {
      this.modalizeFavoritetRef.current?.close();
    }


onFavoriteOPEN()
    {
        this.modalizeFavoritetRef.current?.open();
    }




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
    <View style={{
      flex:1,
    }}>
    <FlatList
    style={{ width:'100%', }}
    data={this.data}
    keyExtractor={(item) => item.key.toString()}
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
                  <TouchableOpacity 
                  onPress={this.onAccountOPEN.bind(this)}>    
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

                  <TouchableOpacity onPress={this.onFavoriteOPEN.bind(this)}>
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
     
                  <Modalize 
                  
                    ref={this.modalizeAccountRef}
                    scrollViewProps={{ showsVerticalScrollIndicator: false }}
                    snapPoint={550}
                    modalHeight={550}
                    animationType='fade'
                    HeaderComponent={
                      <View style={{                        
                        justifyContent:'center',
                        alignItems:'center'}}>
                        <Text>Account</Text>
                      </View>
                    }
                    FooterComponent={
                      <TouchableOpacity onPress={this.onCloseAccount.bind(this)}>
                      <View style={{                        
                        justifyContent:'center',
                        alignItems:'center'}}>
                        <Text style={{ fontSize:30 }}>close</Text>
                      </View>
                      </TouchableOpacity>
                    }


                    
                    >

                      <View style={{
                        flex:1,
                        justifyContent:'center',
                        alignItems:'center'
                      }}>
                        <Text>Account</Text>
                      </View>
                    </Modalize>
    

                    <Modalize 
                    ref={this.modalizeFavoritetRef}
                    snapPoint={550}
                    modalHeight={550}
                     // animationType='fade'
                     HeaderComponent={
                      <View style={{                        
                        justifyContent:'center',
                        alignItems:'center'}}>
                        <Text>Favorite</Text>
                      </View>
                    }
                    FooterComponent={
                      <TouchableOpacity onPress={this.onCloseFavorite.bind(this)}>
                      <View style={{                        
                        justifyContent:'center',
                        alignItems:'center'}}>
                          <Text style={{ fontSize:30 }}>close</Text>
                      </View>
                      </TouchableOpacity>
                    }
                    
                    >
                      <View style={{
                        flex:1,
                        justifyContent:'center',
                        alignItems:'center'
                      }}>
                        <Text>Favorite</Text>
                      </View>
                    </Modalize>




    </View>

 
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