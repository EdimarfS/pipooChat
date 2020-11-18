  
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
} from '../../actions/index';
import { connect } from 'react-redux';

class  UserPersonalDataForm extends Component {

  onButtonPress()
  {
      console.log("UserPersonalData");
    //  const { userName, userID, userLocation, userMantra, userDateOfRegistration } = this.props;
  //    this.props.createUSER({userName,userID,userLocation, userMantra});
  }





render(){ 
  console.log('LoginForm');
  return (
    <View 
    style={{
      marginLeft:10,
      marginRight:10,

    }}>  
    

    
        <TouchableOpacity            
        style={{
            marginTop:10,
            marginBottom:20,
             width:150,
             height:150,
             borderRadius:100,
             alignSelf:'center',
             backgroundColor:'lightgrey',
           }}>


        </TouchableOpacity>







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
  
  const { loading, errorOncreateAccount, userName, userID, userLocation, userBio, userDateOfRegistration} = auth;

  return{ loading, errorOncreateAccount, userName, userID, userLocation, userBio, userDateOfRegistration};
}

export default connect(mapStateToProps, {
  emailCHANGED, 
  passwordCHANGED, 
  userUPDATE_DATA
 })(UserPersonalDataForm);