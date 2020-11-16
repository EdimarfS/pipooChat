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
    createUserACCOUNT, 
    emptytALL_FIELDS, 
  } from '../../actions/index';
import {connect } from 'react-redux';
import { Spinner} from '../reusebleComponents/index';




class SignForm extends Component {

UNSAFE_componentWillMount()
{
  //Will run since the App run 
}


componentDidMount()
{
  //Will run since the App run 
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
    this.props.createUserACCOUNT({ email, password });
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
          <Text style={styles.mantraStyle}> JOIN THOUSANDS OF PEOPLE </Text>
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
        />
        </View>
        

        <View>

        <View style={{ alignSelf:'center'}}>
        <Text style={styles.errorTEXT_STYLE}>
            {this.props.errorCREATE_ACCOUNT}
        </Text>
        </View>

        
        { this.props.loading === false ? 
        <Button
        label="Sign"
        onPress={this.onButtonPress.bind(this)}
        /> : 
          <Spinner/>
        }

        </View>


    <TouchableOpacity 
        onPress={()=>{ 
        Actions.login({type:'replace'})
      }}
        style={{ 
        marginTop:10,
        alignSelf:'center', 
        justifyContent:'center',
        width:'100%',
        height:50,
        backgroundColor:'#00db79',
        borderRadius:5,
         }}>

              <Text style={styles.OptionsStyles}>I have an account</Text>
    
    </TouchableOpacity>
  

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
    alignSelf:'center',
    color:'white'

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
  
    const {email, password, loading, errorCREATE_ACCOUNT } = auth;

    return{ email, password, loading, errorCREATE_ACCOUNT };
}

export default connect(mapStateToProps, { 
    emailCHANGED, 
    passwordCHANGED, 
    createUserACCOUNT, 
    emptytALL_FIELDS 
    
 })(SignForm);