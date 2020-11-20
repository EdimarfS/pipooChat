//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity,
} from "react-native";
import { 
  Input,
  Button,
} from '../reusebleComponents/index';
import { 
  emailCHANGED, 
  passwordCHANGED, 
  userUPDATE_DATA,
  createUSER
} from '../../actions/index';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';
import ImageBlurLoading from 'react-native-image-blur-loading';

class  UserPersonalDataForm extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      userName:'',
      userID:'',
      userLocation:'',
      userBio:'',
      loaded: false,
      data:[],
    }
  }

  onButtonPress()
  {
      console.log("UserPersonalData");
      const { userName, userID, userLocation, userBio, ImageDefault} = this.props;
      this.props.createUSER({userName,userID,userLocation, userBio, ImageDefault});


  }


//      imageURI:'https://firebasestorage.googleapis.com/v0/b/pipocar-61cd8.appspot.com/o/groupCovers%2Fcef4c151ecd7c2fd46180b45fb5bc1a1.jpg?alt=media&token=8beea4de-e1fd-439d-8162-eb7bab61e41c'



render(){ 
  console.log('LoginForm');
  return (
    <View 
    style={{
      marginLeft:10,
      marginRight:10,

    }}>  
    

    
       <View 
       style={{ 
         alignSelf:'center', 
         marginTop:10,
         padding:10,
         backgroundColor:'white',
         borderWidth:1,
         borderColor:'#05c7fc',
         padding:10,
         }}>
         <ImageBlurLoading
         source={{
           uri: 'https://firebasestorage.googleapis.com/v0/b/pipocar-61cd8.appspot.com/o/groupCovers%2Fcef4c151ecd7c2fd46180b45fb5bc1a1.jpg?alt=media&token=8beea4de-e1fd-439d-8162-eb7bab61e41c'
         }}
         style={{
           width:110,
           height:100,
         }}
         
         />
       </View>


      <View 
      style={{
        marginBottom:70,
      }}>  
        <Input
        placeholder="Username"
        autoCapitalize='none'
        autoCorrect={false}
        value={this.props.userName}
        onChangeText={value => this.props.userUPDATE_DATA({
            prop: "userName",
            value
        })} 
        />
      </View>
      <View 
      style={{
        marginBottom:70,
      }}>  
        <Input
        placeholder="ID"
        autoCapitalize='none'
        autoCorrect={false}
        value={this.props.userID}
        onChangeText={value => this.props.userUPDATE_DATA({
            prop: "userID",
            value
        })} 
        />
      </View>
      <View 
      style={{
        marginBottom:70,
      }}>  
        <Input
        placeholder="Location"
        multiline={true}
        maxLength={40}
        autoCapitalize='none'
        autoCorrect={false}
        value={this.props.userLocation}
        onChangeText={value => this.props.userUPDATE_DATA({
            prop: "userLocation",
            value
        })} 
        />
      </View>
      <View 
      style={{
        marginBottom:70,
      }}>  
        <Input
        placeholder="Bio"
        multiline={true}
        maxLength={40}
        autoCapitalize='none'
        autoCorrect={false}
        value={this.props.userBio}
        onChangeText={value => this.props.userUPDATE_DATA({
            prop: "userBio",
            value
        })} 
        secureTextEntry
        />
      </View>
      
      <TouchableOpacity onPress={this.onButtonPress.bind(this)}>
      <View       
      style={{
        marginBottom:30,
        justifyContent:'center',
        alignSelf:'center',
        backgroundColor:'#44e300',
        width:'100%',
        height:60,
        borderRadius:5,
      }}>  
      <Text 
      style={{
      fontSize:20,
      textAlign:'center',
      color:'white',
      fontWeight:'bold'

      }}> Finish </Text>


      </View>
      </TouchableOpacity>


   





    </View>

 
  );
}
}


const mapStateToProps = ({ auth }) => {
  
  const { loading, errorOncreateAccount, userName, userID, userLocation, userBio, userDateOfRegistration, ImageDefault} = auth;

  return{ loading, errorOncreateAccount, userName, userID, userLocation, userBio, userDateOfRegistration, ImageDefault};
}

export default connect(mapStateToProps, {
  emailCHANGED, 
  passwordCHANGED, 
  userUPDATE_DATA,
  createUSER
 })(UserPersonalDataForm);