  
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
  emptyALL_FIELDS
} from '../../actions/index';
import { Spinner} from '../reusebleComponents/index';


class LoginForm extends Component {

constructor(props)
{ 
  super(props);
  this.state = {
    fieldEmpty:false
  }

}


onEmailChange(text){

    this.props.emailCHANGED(text);
    if(text!=''){
    this.setState({
      fieldEmpty:true,
    });
  }else{
    this.setState({
      fieldEmpty:false,
    });

  }
  
}

onPasswordChange(text)
{
    this.props.passwordCHANGED(text);

    if(text!=''){
      this.setState({
        fieldEmpty:true,
      });
    }else{
      this.setState({
        fieldEmpty:false,
      });
  
    }
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

  console.log('LOADING!!!!!!!!', this.props.loading);
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
          //fontWeight:'bold',
          fontSize:30,
        }}>
         Welcome to Pipoca 
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
{ this.props.loading==false ? 
(      
      <View>

{ this.state.fieldEmpty === true ? ( <View       
      style={{
        marginBottom:80,
      }}>  
        <Button
        onPress={this.onButtonPress.bind(this)}
        label="Login"
        />
      </View>):
      <View style={{ flex:1, marginBottom:80 }}>
        <View style={{
                  backgroundColor:'lightgrey',
                  width:'100%',
                  height:60,
                  marginTop:10,
                  borderRadius:5,
                  justifyContent:'center',
                  alignItems:'center',
          

        }}>
          <Text style={{
            fontWeight:'bold',
            fontSize:20,
            color:'white'
          }}>Login</Text>

        </View>
        
      </View>
      
      }
      <TouchableOpacity
      onPress={()=>{ 
        this.props.emptyALL_FIELDS();
        Actions.forgetpassword({type:'replace'})}}
      >
      <View       
      style={{
        marginBottom:20,
        justifyContent:'center',
        alignSelf:'center',
      }}>  
      <Text 
      style={{
      fontSize:20,
      fontWeight:'bold',
      color:'#05c7fc'

      }}>Forget your email or password</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={()=>{
        this.props.emptyALL_FIELDS();
        Actions.sign({type:'replace'})}}
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
      color:'black'

      }}>Sign In</Text>
      </View>
      </TouchableOpacity>



      </View>
      
      
      
      ):
      <View
      style={{
        marginTop:20,
        marginBottom:30,
      }}
      >
      <Spinner/>
      </View>}


 

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
  emptyALL_FIELDS
 })(LoginForm);