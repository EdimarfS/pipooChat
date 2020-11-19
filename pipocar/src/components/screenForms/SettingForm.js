  
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
      data:[],
    }


  }

    UNSAFE_componentWillMount()
    {
      this.userAllInfo();
    }



    onButtonPress()
    {
      console.log("Bottom pressed!");
      const { userName, userID, userLocation, userBio } = this.state;
      this.props.updateUSER(userName,userID,userLocation, userBio);
    

    }





//Fecthing the data

userAllInfo = () => {
  //fecthing the data first

      const { currentUser } = auth();
      database().ref(`/users/${currentUser.uid}`)
      .on('value', snapshot => {
         console.log('SANPSHOT', snapshot)

          console.log("USER DATA FETCH From User Reducer!!!!!!!!!!!!!!!!!!!!!!");
          const data = snapshot.val();
          this.setState({
              userName: data.userName,
              userID: data.userID,
              userLocation: data.userLocation,
              userBio: data.userBio,
              loaded: true,

          })
               
          }) 

          
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
                     HeaderComponent={
                      <View style={{                        
                        justifyContent:'center',
                        alignItems:'center'}}>
                        <Text>Favorite</Text>
                      </View>
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