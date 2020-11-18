  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { 
  Input,
  Button

} from '../components/reusebleComponents/index';
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
      backgroundColor:'#f2f2f2'
    }}>
    <FlatList
    style={{ width:'100%', }}
    data={this.data}
    keyExtractor={(item) => item.key.toString()}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    renderItem= {({item}) => {

      return(
        <View 
        //style={{ marginLeft:10, marginRight:10}}
        >
          <View
          style={{
            marginTop:'40%',
          }}
          > 
                  <TouchableOpacity 
                  onPress={this.onAccountOPEN.bind(this)}>    
                  <View 
                  style={{
                   // marginBottom:30,
                    flexDirection:'row',
                    backgroundColor:'white',
                    borderBottomColor:'#f0f0f0',
                    borderBottomWidth:1,
                    

                  }}
                  >
                    <View style={styles.iconStyles}>
                    <Text>Icon</Text>
              

                    </View>
                    <Text 
                    style={{
                      fontSize:25,
                      //fontWeight:'bold'
                    }}>
                    {item.account}
                    </Text>
                  </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={this.onFavoriteOPEN.bind(this)}>
                  <View 
                    style={{
                   // marginBottom:30,
                    flexDirection:'row',
                    backgroundColor:'white',
                    borderBottomColor:'#f0f0f0',
                    borderBottomWidth:1,

                  }}>
                    <View style={styles.iconStyles}>
                    <Text>Icon</Text>
                    </View>
                    <Text
                    style={{
                      fontSize:25,
                     // fontWeight:'bold'
                    }}>{item.favorite}</Text>  
                  </View>
                  </TouchableOpacity>

                  <TouchableOpacity 
                  onPress={this.onLogoutPRESSED.bind(this)}>
                  <View
                  style={{
                    marginBottom:30,
                    flexDirection:'row',
                    backgroundColor:'white',
                    borderBottomColor:'#f0f0f0',
                    borderBottomWidth:1,
                  }}
                  >
                    <View style={styles.iconStyles}>
                    <Text>Icon</Text>
                    </View>
                    <Text 
                    style={{
                      fontSize:25,
                     // fontWeight:'bold'
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
                    snapPoint={450}
                    modalHeight={450}
                    animationType='fade'
                    HeaderComponent={
                      <View style={{                        
                        justifyContent:'center',
                        marginBottom:10,
                        marginTop:10,
                        alignItems:'center'}}>
                        <Text style={{
                          fontWeight:'bold',
                          color:'grey'
                        }}>Edit your personal information</Text>
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
                    <ScrollView 
                    style={{
                      marginLeft:10,
                      marginRight:10,
                
                    }}>  

                        <TouchableOpacity            
                        style={{
                            marginTop:10,
                           // marginBottom:20,
                             width:100,
                             height:100,
                             borderRadius:100,
                             alignSelf:'center',
                             backgroundColor:'lightgrey',
                           }}>
                
                
                        </TouchableOpacity>

                      <View 
                      style={{
                        marginBottom:0,
                      }}>  
                        <Input
                      
                        placeholder="Username"
                        />
                      </View>
                      <View 
                      style={{
                      //  marginBottom:10,
                      }}>  
                        <Input
                      
                        placeholder="ID"
                        />
                      </View>
                      <View 
                      style={{
                        //marginBottom:10,
                      }}>  
                        <Input
                        placeholder="Bio"
                        multiline={true}
                        maxLength={40}
                        />
                      </View>
                      <View 
                      style={{
                        //marginBottom:10,
                      }}>  
                        <Input
                        placeholder="Mantra"
                        secureTextEntry
                        />
                      </View>
                
                      <View       
                      style={{
                      //  marginBottom:30,
                        justifyContent:'center',
                        alignSelf:'center',
                        backgroundColor:'#44e300',
                        width:'100%',
                        height:60,
                        borderRadius:5,
                        marginTop:10,
                      }}>  
                      <Text 
                      style={{
                      fontSize:20,
                      textAlign:'center',
                      color:'white',
                      fontWeight:'bold'
                
                      }}> Finish </Text>
                
                
                      </View>
                
                    </ScrollView>

                    </Modalize>



                    
    

                    <Modalize 
                    ref={this.modalizeFavoritetRef}
                    snapPoint={450}
                    modalHeight={450}
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
    marginBottom:20,
  }
  
}