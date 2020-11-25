  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  FlatList,
  TouchableOpacity,
} from "react-native";
import { 
  Input,
  Button,
  InputDataEdit

} from '../reusebleComponents/index';
import { Actions } from 'react-native-router-flux';
import { Modalize } from 'react-native-modalize';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';



import { 
  emailCHANGED, 
  passwordCHANGED, 
  userUPDATE_DATA,
  createUSER,
  updateUSER
 } from '../../actions/index'; 
import { connect } from 'react-redux';

class  SettingForm extends Component {
  
  
  constructor(props)
  {
    super(props)

    this.modalizeAccountRef = React.createRef();

    this.modalizeFavoritetRef = React.createRef();
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
    }


  }



  UNSAFE_componentWillMount()
  {


    this.fetchSAVE_GROUP();
    this.fetchSAVE_POST();

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


renderHeaderGROUP = () => {
  return(
    <TouchableOpacity
    onPress={()=> this.setState({ checkGroup:true })}
    >
    <View 
    style={{
     alignSelf:'center'
    }}>
      <Text style={{ fontWeight:'bold'}}>Groups</Text>
    </View>
    </TouchableOpacity>
  )
}

renderHeaderPOST = () => {
  return(
    <TouchableOpacity
    onPress={()=> this.setState({checkPost:true})}
    >
    <View 
    style={{
     alignSelf:'center'
    }}>
      <Text style={{ fontWeight:'bold'}}>Posts</Text>
    </View>
    </TouchableOpacity>
  )
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
                    <Text>Icon</Text>
              

                    </View>
                    <Text 
                    style={{
                      fontSize:20,
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
                      fontSize:20,
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
                      fontSize:20,
                     // fontWeight:'bold'
                    }}>{item.logout}</Text>
                    </View>
                    </TouchableOpacity>

                    </View>



        </View>

      )}}
    />

                    <Modalize 
                    ref={this.modalizeFavoritetRef}
                    snapPoint={500}
                    modalHeight={500}
                     // animationType='fade'    
                    >
                      <View 
                      style={{
                        flex:1,
                      }}
                      >


                          <FlatList
                            data={this.state.dataGroup}
                          //  refreshing={this.state.refreshing} 
                         //   onRefresh={this.onRefresh}
                            ListHeaderComponent={this.renderHeaderGROUP}
                            showsVerticalScrollIndicator ={false}
                            showsHorizontalScrollIndicator={false}
                          // ListEmptyComponent={this._listEmptyComponent}
                            keyExtractor={ item => item._id.toString()}
                          // numColumns={3}
                        //   horizontal ={true}

                            renderItem={({item}) => {

                              return(
                                <View>
                              {
                               this.state.checkGroup === true ?  <Text>{item.groupname}111</Text> : <View></View>}
                                </View>
                              )



                            }}/>
                


                        
                         <FlatList
                            data={this.state.dataPost}
                          //  refreshing={this.state.refreshing} 
                         //   onRefresh={this.onRefresh}
                            ListHeaderComponent={this.renderHeaderPOST}
                            showsVerticalScrollIndicator ={false}
                            showsHorizontalScrollIndicator={false}
                          // ListEmptyComponent={this._listEmptyComponent}
                            keyExtractor={ item => item._id.toString()}
                          // numColumns={3}
                        //   horizontal ={true}

                            renderItem={({item}) => {

                              return(
                                <View>
                                 { this.state.checkPost === true ?  <Text>{item.posted}111</Text> : <View></View>}
                                </View>
                              )



                            }}/>
                          </View>
               

                    </Modalize>


    
     





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