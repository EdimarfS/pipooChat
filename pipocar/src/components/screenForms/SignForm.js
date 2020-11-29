  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity
} from "react-native";
import { 
  Input,
  Button
} from '../reusebleComponents/index';
import { 
  Actions
  } from 'react-native-router-flux';
import { 
    emailCHANGED, 
    passwordCHANGED, 
    createUserACCOUNT
  } from '../../actions/index';
import { connect } from 'react-redux';
import { Spinner } from '../reusebleComponents/index';

class  SignForm extends Component {
  

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
    this.props.createUserACCOUNT({ email, password });
}




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
          create an account
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
      <Text style={{color:'red'}}>{this.props.errorCREATE_ACCOUNT}</Text>
      </View>
      
{ this.props.loading === false ? ( 
      <View>     
      <View       
      style={{
        marginBottom:80,
      }}>  
        <Button
        label="create an account"
        onPress={this.onButtonPress.bind(this)}
        />
      </View>
      <TouchableOpacity 
      onPress={()=>{ Actions.login({type:'replace'})}}
      >
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

      }}>I have an account</Text>


      </View>
      </TouchableOpacity>
      </View>
      
      
      
      ):
      <View style={{
        marginTop:40,
        marginBottom:30,
      }}>
        <Spinner/>
      </View>
      }







    </View>

 
  );
}
}
const mapStateToProps = ({ auth }) => {
  
  const {email, password, loading, errorCREATE_ACCOUNT } = auth;

  return{ email, password, loading, errorCREATE_ACCOUNT };
}

export default connect(mapStateToProps, {
  emailCHANGED, 
  passwordCHANGED, 
  createUserACCOUNT,

 })(SignForm);