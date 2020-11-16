import { StatusBar } from 'expo-status-bar';
import React, { Component} from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import { 
  Input,
  Button,

} from '../reusebleComponents/index';
import { Actions } from 'react-native-router-flux';
import { Spinner} from '../reusebleComponents/index';
import {connect } from 'react-redux';
import { 
    emailCHANGED, 
    passwordCHANGED, 
    loginUSER, 
    emptytALL_FIELDS,
    forgotPASSWORD,

  } from '../../actions/index';
class ForgetPasswordScreen extends Component {

  render(){
  console.log('Sign!');
  return (
    <ScrollView style={styles.container}>
      <View style={{ marginTop:'50%', marginLeft:10, marginRight:10}}>
        <View style={{
          justifyContent:'center',
          alignSelf:'center',
          marginBottom:10,
        }}>
          <Text style={styles.mantraStyle}> RESET YOUR PASSWORD </Text>
        </View>
        <View style={{ marginBottom:'1%'}}>
        <Input
        placeholder="email"
        />
        </View>
        <View style={{ marginBottom:'1%'}}>
        <Input
        placeholder="password" 
        />
        </View>



        <View style={{ alignSelf:'center'}}>
        <Text style={styles.errorTEXT_STYLE}>
            {this.props.error}
        </Text>
        </View>
        
        { this.props.loading === false ? 
        <Button
        label="Sign"
        onPress={this.props.forgotPASSWORD(this.props.email)}
        /> : 
          <Spinner/>
        }

    <TouchableOpacity 
        onPress={()=>{   
        Actions.login({type:'replace'})}
        }
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
  
    const {email, password, loading, error } = auth;

    return{ email, password, loading, error };
}

export default connect(mapStateToProps, { 
    emailCHANGED, 
    passwordCHANGED, 
    loginUSER, 
    forgotPASSWORD,
    emptytALL_FIELDS
    
 })(ForgetPasswordScreen);