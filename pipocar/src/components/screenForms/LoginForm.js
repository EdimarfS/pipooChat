import { StatusBar } from 'expo-status-bar';
import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { 
    Input,
    Button,
  
  } from '../reusebleComponents/index';
import { Actions } from 'react-native-router-flux';
import { 
    emailCHANGED, 
    passwordCHANGED, 
    loginUSER, 
    emptytALL_FIELDS
  } from '../../actions/index';
import {connect } from 'react-redux';
import { Spinner} from '../reusebleComponents/index';




class LoginForm extends Component {

UNSAFE_componentWillMount()
{

}
componentDidMount()
{

}



onEmailChange(text){
    this.props.emailCHANGED(text);
}

onPasswordChange(text)
{
    this.props.passwordCHANGED(text);
}

onButtonPress()
{
    const { email, password } = this.props;
    this.props.loginUSER({ email, password });
}



  render(){
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop:'20%', marginLeft:10, marginRight:10}}>
        <View style={{
          justifyContent:'center',
          alignSelf:'center',
          marginBottom:10,
        }}>
          <Text style={styles.mantraStyle}> Talk with more than 30k people aroud the world </Text>
        </View>
        <View style={{ marginBottom:'1%'}}>
        <Input
        placeholder="email" 
        value={this.props.email}
        onChangeText={this.onEmailChange.bind(this)}   
        autoCapitalize='none'
        autoCorrect={false}

        />
        </View>
        <View style={{ marginBottom:'1%'}}>
        <Input
        placeholder="password" 
        value={this.props.password}
        onChangeText={this.onPasswordChange.bind(this)}   
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry
        />
        </View>
        

        <View>

        <View style={{ alignSelf:'center'}}>
        <Text style={styles.errorTEXT_STYLE}>
            {this.props.error}
        </Text>
        </View>
        
        { this.props.loading === false ? 
        <Button
        label="Login"
        onPress={this.onButtonPress.bind(this)}
        /> : 
          <Spinner/>
        }

        </View>

        <View style={{ 
         flexDirection:'row',
         justifyContent:'space-between', 
         marginTop:40,
         }}>
            <View>
            <TouchableOpacity onPress={()=>{ 
              Actions.forgetpassword() }}>
              <Text style={styles.OptionsStyles}>Forget password ?</Text>
              </TouchableOpacity>
            </View>
           
            <View>
            <TouchableOpacity onPress={()=>{ Actions.sign()}}>
            <Text style={styles.OptionsStyles}> Sign in</Text>
            </TouchableOpacity>
            </View>
  


        </View>
      </View>

    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
  },
  OptionsStyles :{
    fontWeight:'bold',

  },
  mantraStyle : {
    fontWeight:'bold'
  },
  errorTEXT_STYLE : {
      fontWeight:'bold',
      fontSize:13,
      color:'red'
  }
});

const mapStateToProps = ({ auth }) => {
  
    const {email, password, loading, error } = auth;

    return{ email, password, loading, error };
}

export default connect(mapStateToProps, { 
    emailCHANGED, 
    passwordCHANGED, 
    loginUSER, 
    emptytALL_FIELDS

    
 })(LoginForm);