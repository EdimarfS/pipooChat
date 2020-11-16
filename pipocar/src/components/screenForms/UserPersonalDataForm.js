import { StatusBar } from 'expo-status-bar';
import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { 
  Input,
  Button,
} from '../reusebleComponents/index';
import {connect } from 'react-redux';
import { 
  emailCHANGED, 
  passwordCHANGED, 
  loginUSER, 
  createUserACCOUNT, 
  userUPDATE_DATA, 
  createUSER, 
  accountFIELD_EMPTY, 
} from '../../actions/index';
import { Spinner } from '../reusebleComponents/index';

class UserPersonalDataForm extends Component {


    onButtonPress()
    {
        console.log("UserPersonalData");
        const { userName, userID, userLocation, userMantra, userDateOfRegistration } = this.props;
        this.props.createUSER({userName,userID,userLocation, userMantra});
    }


  render(){
  console.log('Sign!');
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop:'10%', marginLeft:10, marginRight:10}}>
        <View style={{
          justifyContent:'center',
          alignSelf:'center',
          marginBottom:10,
        }}>
          <TouchableOpacity style={{
            width:100,
            height:100,
            backgroundColor:'lightgrey',
            marginBottom:10,
            borderRadius:10,
          }}>

          </TouchableOpacity>
        
        </View>
        <View style={{ marginBottom:'1%'}}>
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
        <View style={{ marginBottom:'1%'}}>
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
        <View style={{ marginBottom:'1%'}}>
        <Input
        placeholder="Location"
        autoCapitalize='none'
        autoCorrect={false}
        value={this.props.userLocation}
        onChangeText={value => this.props.userUPDATE_DATA({
            prop: "userLocation",
            value
        })} 
        />
        </View>
        <View style={{ marginBottom:'1%'}}>
        <Input
        placeholder="Mantra"
        autoCapitalize='none'
        autoCorrect={false}
        value={this.props.userMantra}
        onChangeText={value => this.props.userUPDATE_DATA({
            prop: "userMantra",
            value
        })} 
        />
        </View>
        <View style={{ marginBottom:'1%'}}>
        </View>
        

        <View>

{ this.props.loading === false ?    
        <Button
        onPress={this.onButtonPress.bind(this)}
        label="Sign"
        /> : <Spinner/>
            
            }


        
        </View>

      </View>

    </ScrollView>
  );
}
}



const mapStateToProps = ({ auth }) => {
  
    const { loading, errorOncreateAccount, userName, userID, userLocation, userMantra, userDateOfRegistration} = auth;

    return{ loading, errorOncreateAccount, userName, userID, userLocation, userMantra, userDateOfRegistration }
}



export default connect(mapStateToProps,{
    emailCHANGED, 
    passwordCHANGED, 
    loginUSER, 
    createUserACCOUNT, 
    userUPDATE_DATA, 
    createUSER, 
    accountFIELD_EMPTY, 


})(UserPersonalDataForm);





const styles = StyleSheet.create({
    container: {
    },
    OptionsStyles :{
      fontWeight:'bold'
    },
    mantraStyle : {
      fontWeight:'bold'
    }
  });