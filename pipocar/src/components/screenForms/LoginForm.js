  
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
  Button
} from '../reusebleComponents/index';
import { 
  Actions
  } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { 
  emailCHANGED, 
  passwordCHANGED, 
  loginUSER, 
} from '../../actions/index';
import { Spinner} from '../reusebleComponents/index';


class LoginForm extends Component {
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
    if(email!='' && email!= null &&  password!='' && password!= null ){
    this.props.loginUSER({ email, password });
    }
}




render(){ 
  console.log('LoginForm');
  return (
    <View 
    style={{
      flex:1,
      marginLeft:10,
      marginRight:10,

    }}>  
      <View 
      style={{
        marginTop:50,
        justifyContent:'center',
        alignSelf:'center',
        marginBottom:40,
      }}>
        <Text 
        style={{
          fontWeight:'bold',
          fontSize:30,
        }}>
          log to your account
        </Text>

      </View>
      <View 
      style={{
        marginBottom:70,
      }}>  
        <Input 
        placeholder="email"
        value={this.props.email}
        onChangeText={this.onEmailChange.bind(this)}   
        autoCapitalize='none'
        autoCorrect={false}
        />
      </View>
      <View 
      style={{
        marginBottom:70,
      }}>  
        <Input
        placeholder="password"
        value={this.props.password}
        onChangeText={this.onPasswordChange.bind(this)}   
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry

        />
      </View>

      <View style={{ justifyContent:'center', alignItems:'center'}}>
      <Text style={{color:'red'}}>{this.props.error}</Text>
      </View>
      <View       
      style={{
        marginBottom:100,
      }}>  
        <Button
        onPress={this.onButtonPress.bind(this)}
        label="Login"
        />
      </View>

      <TouchableOpacity
      onPress={()=>{ Actions.forgetpassword({type:'replace'})}}
      >
      <View       
      style={{
        marginBottom:30,
        justifyContent:'center',
        alignSelf:'center',
      }}>  
      <Text 
      style={{
      fontSize:20,
      fontWeight:'bold'

      }}>Forget your accout</Text>
      </View>
      </TouchableOpacity>


      <TouchableOpacity
      onPress={()=>{ Actions.sign({type:'replace'})}}
      >
      <View 
      style={{
        justifyContent:'center',
        alignSelf:'center',
      }}>
      <Text 
      style={{
      fontSize:20,
      textAlign:'center',
      fontWeight:'bold',
      color:'#05c7fc'

      }}>Sign In</Text>
      </View>
      </TouchableOpacity>
 

    </View>

 
  );
}
}



const mapStateToProps = ({ auth }) => {
  
  const { email, password, loading, error } = auth;

  return{ email, password, loading, error };
}

export default connect(mapStateToProps, {
  emailCHANGED, 
  passwordCHANGED, 
  loginUSER, 
 })(LoginForm);