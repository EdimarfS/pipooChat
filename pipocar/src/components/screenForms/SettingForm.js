  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  FlatList,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { 
  Input,
  Button,
  InputDataEdit,
  Spinner

} from '../reusebleComponents/index';
import { Actions } from 'react-native-router-flux';
import { Modalize } from 'react-native-modalize';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import  Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageBlurLoading from 'react-native-image-blur-loading';

//AntDesign
//import IconEvilIcons from 'react-native-vector-icons/EvilIcons';

import { 
  emailCHANGED, 
  passwordCHANGED, 
  userUPDATE_DATA,
  createUSER,
  updateUSER
 } from '../../actions/index'; 
import { connect } from 'react-redux';
import ImageModal from 'react-native-image-modal';


class  SettingForm extends Component {
  
  
  constructor(props)
  {
    super(props)

    this.modalizeAccountRef = React.createRef();

    this.modalizeSavedtRef = React.createRef();
    this.state = {
      userName:'',
      userID:'',
      userLocation:'',
      userBio:'',
      loaded: false,
      dataGroup:[],
      dataPost:[],
      checkPost: false,
      checkGroup: false,
      dataloaded:false
      
    }


  }


  UNSAFE_componentWillMount()
  {


    this.fetchSAVE_GROUP();
    this.fetchSAVE_POST();
    Actions.refresh({});


  }


  

  //Fetch SAVE_GROUPS 
  fetchSAVE_GROUP = () => {

    firestore()
    .collection('SAVE_GROUP')
    .orderBy('posted', 'desc')
    .onSnapshot(querySnapshot => {
        
        var  thread  = querySnapshot.docs.map(doc => {
  
            return {
                _id : doc.id,
                ...doc.data()
            }
        })
  
        this.setState({
          dataGroup:thread,
          refreshing:false,
          loaded:true,
        })
    }, this.onError)
  
  }

  fetchSAVE_POST = () => {

    firestore()
    .collection('SAVE_POST')
    .orderBy('posted', 'desc')
    .onSnapshot(querySnapshot => {
        
        var  thread  = querySnapshot.docs.map(doc => {
  
            return {
                _id : doc.id,
                ...doc.data()
            }
        })
  
        this.setState({
          dataPost:thread,
          refreshing:false,
          loaded:true,
          imageLoaded:true,
        })
    }, this.onError)
  
  }
    



    onButtonPress()
    {
      console.log("Bottom pressed!");
      const { userName, userID, userLocation, userBio } = this.state;
   //   this.props.updateUSER(userName,userID,userLocation, userBio);
    

    }





//Fecthing the data






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


onCloseFavorite()
    {
      this.modalizeSavedtRef.current?.close();
    }


onSaveOPEN()
    {
        this.modalizeSavedtRef.current?.open();
    }




data = [
{
    account : 'Accout',
    key:1,

    saved : 'Saved',
    key:2,

    logout : 'Log out',
    key:3,
}


]

onLogoutPRESSED = () =>{
    Actions.auth({type:'replace'});
}


renderHeaderGROUP = () => {
  return(
    <View>
    <TouchableOpacity
    onPress={()=> this.setState({ checkGroup:true })}
    >
    <View 
    style={{
     alignSelf:'center',
     marginTop:10,
    }}>
      <View style={{
        alignSelf:'center',
        flexDirection:'row'
      }}>
        <EvilIcons
         name="comment" size={38} color="grey" />
      <Text 
      style={{ 
        //fontWeight:'bold',
        fontSize:10,
        color:'grey',
        alignSelf:'center',
        fontWeight:'bold',

        }}>(Rooms)</Text>
        </View>




    </View>
    </TouchableOpacity>
    </View>
  )
}

renderHeaderPOST = () => {
  return(
    <TouchableOpacity
    onPress={()=> this.setState({checkPost:true})}
    >
    <View 
    style={{
     alignSelf:'center',
    marginTop:'20%'
    }}>
      <View style={{
        alignSelf:'center',
        flexDirection:'row'
      }}>
        <EvilIcons
         name="image" 
         size={38} 
         color="grey" 
         />
      <Text 
      style={{ 
        //fontWeight:'bold',
        fontSize:10,
        color:'grey',
        alignSelf:'center',
        fontWeight:'bold'

        }}>(Post)</Text>
        </View>
    </View>
    </TouchableOpacity>
  )
}


renderEMPTY = () => {

  return(
    <View style={{
      alignSelf:'center',
    }}>
      <Text style={{
            fontSize:10,
            marginTop:10,
            color:'grey'
      }}>no post or groups saved yet. save one</Text>
    </View>
  )
}

renderHeaderSettings = () => {
  return(
    <View style={{ 
      alignSelf:'center',
     // backgroundColor:'red',
      }}>
  
    <Image
  //  thumbnailSource={{ uri: auth().currentUser.photoURL }}
    source={{ uri: auth().currentUser.photoURL }}
    style={{
        width:100,
        height:100,
        borderRadius:50,
        marginTop:10,
        alignSelf:'center',
        justifyContent:'center',
        backgroundColor:'lightgrey',
   
    }}
    /> 

      <View style={{ 
        marginTop:30,
        alignSelf:'center',
      
        }}>
      <Text style={{ 
        fontWeight:'bold',
        color:'#05c7fc',
        textAlign:'center'
        }}>{auth().currentUser.displayName}</Text>
      </View>
  </View>

  )
}
render(){ 
  console.log('SettingScreen');
  return (

    <View style={{ flex:1,}}>
{ this.state.dataloaded === false ? (    <View style={{
      flex:1,
      backgroundColor:'white'
    }}>




    <FlatList
    style={{ width:'100%', }}
    data={this.data}
    keyExtractor={(item) => item.key.toString()}
    ListHeaderComponent={this.renderHeaderSettings}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    renderItem= {({item}) => {
     
      return(
        <View 
        //style={{ marginLeft:10, marginRight:10}}
        >
          <View
          style={{
            marginTop:'20%',
          }}
          > 
                  <TouchableOpacity 
                  onPress={()=>{Actions.userpersonaleditdata()}}
                  >    
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
                    <View style={{
                      marginLeft:10,
                      marginTop:2,
                    }}>
                    <EvilIcons name="user" size={30} color="black" />
                    </View>
              

                    </View>
                    <Text 
                    style={{
                      fontSize:20,
                     // fontWeight:'bold'
                      //fontWeight:'bold'
                    }}>
                    {item.account}
                    </Text>
                  </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={this.onSaveOPEN.bind(this)}>
                  <View 
                    style={{
                   // marginBottom:30,
                    flexDirection:'row',
                    backgroundColor:'white',
                    borderBottomColor:'#f0f0f0',
                    borderBottomWidth:1,

                  }}>
                    <View style={styles.iconStyles}>
                    <View style={{
                      marginLeft:15,
                      marginTop:2,
                      
                    }}>
                    <Fontisto  name="favorite" size={25} />
                    </View>
                    </View>
                    <Text
                    style={{
                      fontSize:20,
                      marginLeft:10
                     // fontWeight:'bold'
                     // fontWeight:'bold'
                    }}>{item.saved}</Text>  
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
                    <View style={{
                      marginLeft:10,
                      marginTop:3
                    }}>
                    <Ionicons name="ios-exit" size={30} color="black" />
                    </View>
                    </View>
                    <Text 
                    style={{
                      fontSize:20,
                      marginTop:2,
                      marginLeft:10
                     // fontWeight:'bold'
                     // fontWeight:'bold'
                    }}>{item.logout}</Text>
                    </View>
                    </TouchableOpacity>

                    </View>



        </View>

      )}}
    />

                    <Modalize 
                    ref={this.modalizeSavedtRef}
                    snapPoint={500}
                    modalHeight={500}
                    HeaderComponent={()=>{
                      return(
                        <Text 
                        style={{
                          textAlign:'center',
                          fontSize:13,
                          marginBottom:20,
                          marginTop:10,
                          fontWeight:'bold'
                      
                        }}
                        >
                        List of Groups and Posts saved
                        </Text>
                      )
                    }}
                     // animationType='fade'    
                    >

                      <View 
                      style={{
                        //flex:1,
                      }}
                      >


                          <FlatList
                            data={this.state.dataGroup}
                          //  refreshing={this.state.refreshing} 
                         //   onRefresh={this.onRefresh}
                            ListHeaderComponent={this.renderHeaderGROUP}
                            ListEmptyComponent={this.renderEMPTY}
                            showsVerticalScrollIndicator ={false}
                            showsHorizontalScrollIndicator={false}
                          // ListEmptyComponent={this._listEmptyComponent}
                            keyExtractor={ item => item._id.toString()}
                          // numColumns={3}
                        //   horizontal ={true}
                            scrollEnabled={false}

                            renderItem={({item}) => {
                              if(item.author === auth().currentUser.uid)
                              return(
                                <TouchableOpacity
                                onLongPress={()=>{
                                  Alert.alert(
                                    item.name,
                                    `Do you want to delete "${item.groupname}"`,
                                    [
                                      {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                      },
                                      { text: "OK", onPress: () => {
                                        firestore()
                                        .collection('SAVE_GROUP')
                                        .doc(item._id)
                                        .delete()
                                        .then(()=>{
                                          console.log('GROUP Successfully deleted');
                                        })
                                        .catch(()=>{
                                          console.log('Something went wrong, could not be save');
                                        })
                                      } }
                                    ],
                                    { cancelable: false }
                                  )
                                }}
                                style={{
                                 // alignSelf:'center',
                                  //flex:1,
                                  marginLeft:10,
                                }}
                                >
 

                                  <View style={{
                                    flexDirection:'row'
                                  }}>
                                    <View style={{
                                      flexDirection:'row'
                                    }}>

                                      
{ this.state.imageLoaded === true ? (                                   
                                  <Image
                                    source={{
                                      uri : item.groupcover
                                    }}
                                    style={{
                                      width:40,
                                      height:40,
                                      borderRadius:90,

                                      marginTop:10,
                                      backgroundColor:'lightgrey'
                                    }}
                                    />) : 
                                    <View>
                                      <Spinner/>
                                    </View>
                                    }



                                    <View 
                                    style={{
                                      alignSelf:'center',
                                      marginLeft:10
                                    }}>
                                    <Text style={{ fontWeight:'bold' }}>{item.groupname} </Text>
                                    </View>


                                    </View>
                                    
                                  
                                  </View>
                                  
                                  
                                
                                </TouchableOpacity>
                              )



                            }}/>
                


                        
                         <FlatList
                            data={this.state.dataPost}
                          //  refreshing={this.state.refreshing} 
                         //   onRefresh={this.onRefresh}
                            ListHeaderComponent={this.renderHeaderPOST}
                            ListEmptyComponent={this.renderEMPTY}
                            showsVerticalScrollIndicator ={false}
                            showsHorizontalScrollIndicator={false}
                          // ListEmptyComponent={this._listEmptyComponent}
                            numColumns={3}
                            keyExtractor={ item => item._id.toString()}
                            //numColumns={3}
                         //  horizontal ={true}
                             scrollEnabled={false}
                            renderItem={({item}) => {
                              
                              if(item.author === auth().currentUser.uid)
                              return(
                                <View 
                                
                                onLongPress={()=>{
                                  Alert.alert(
                                    item.name,
                                    `Do you want to delete "${item.caption}"`,
                                    [
                                      {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                      },
                                      { text: "OK", onPress: () => {
                                        firestore()
                                        .collection('SAVE_POST')
                                        .doc(item._id)
                                        .delete()
                                        .then(()=>{
                                          console.log('POST Successfully deleted');
                                        })
                                        .catch(()=>{
                                          console.log('Something went wrong, could not be save');
                                        })
                                      } }
                                    ],
                                    { cancelable: false }
                                  )
                                }}
                                style={{
                                 // alignSelf:'center',
                                  flex:1/3,
                                 // marginLeft:10,
                                }}
                                >



                                  <View style={{
                                    flexDirection:'row',
                                    alignSelf:'center',
                                    marginTop:10,     
                                  }}>

                                  <View style={{  alignSelf:'center', borderRadius:10}}>

{ this.state.imageLoaded === true ? (                                   
                                  <ImageModal
                                  resizeMode="contain"
                                  imageBackgroundColor="lightgrey"
                                  source={{ uri: item.image}}
                                    style={{
                                      width:100,
                                      height:100,
                                      //borderRadius:90,

                                     
                                      backgroundColor:'lightgrey'
                                    }}
                                    />) : 
                                    <View>
                                      <Spinner/>
                                    </View>
                                    }
                                                  




                                              </View>




                                    <View>
                                    
                                    
                                    </View>
                                    
                                  
                                  
                                  </View>
                                  <TouchableOpacity
                                  onPress={()=>{
                                    Alert.alert(
                                      item.name,
                                      `Do you want to delete "${item.caption}"`,
                                      [
                                        {
                                          text: "Cancel",
                                          onPress: () => console.log("Cancel Pressed"),
                                          style: "cancel"
                                        },
                                        { text: "OK", onPress: () => {
                                          firestore()
                                          .collection('SAVE_POST')
                                          .doc(item._id)
                                          .delete()
                                          .then(()=>{
                                            console.log('POST Successfully deleted');
                                          })
                                          .catch(()=>{
                                            console.log('Something went wrong, could not be save');
                                          })
                                        } }
                                      ],
                                      { cancelable: false }
                                    )
                                  }}
                                  
                                  >
                                      <Text style={{ alignSelf:'center', fontWeight:'bold', color:'grey'}}>Remove</Text>
                                  </TouchableOpacity>
                               
                                </View>
                              )



                            }}/>
                          </View>
               

                    </Modalize>

    </View>
): <Spinner/>
}


    
    </View>

 
  );
}
}

const mapStateToProps = ({ auth }) => {
  
  const { loading, errorOncreateAccount, userName, userID, userLocation, userBio, userDateOfRegistration} = auth;

  return{ loading, errorOncreateAccount, userName, userID, userLocation, userBio, userDateOfRegistration};
}

export default connect(mapStateToProps, {
  emailCHANGED, 
  passwordCHANGED, 
  userUPDATE_DATA,
  createUSER,
  updateUSER
 })(SettingForm);



 const styles = {
  listBackground : {
    listBackgroundColor:'red',
  },
  iconStyles : { 
    marginRight:10,
    marginBottom:20,
  }
  
}