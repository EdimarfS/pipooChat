import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity,
} from "react-native";
import { 
  InputDataEdit
} from '../reusebleComponents/index';
import { 
  userUPDATE_DATA,
  createUSER
} from '../../actions/index';
import { connect } from 'react-redux';
import ImageBlurLoading from 'react-native-image-blur-loading';
import { Spinner } from '../reusebleComponents/Spinner';
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
      dataloaded:false,
      errorMessage:''
    }
  }


  UNSAFE_componentWillMount()
  {
    console.log('LOADING STATE!!!!!!', this.props.loading);
  }

  onButtonPress()
  {
      console.log("UserPersonalData");
      const { userName, userID, userLocation, userBio, ImageDefault } = this.props;

      if(this.props.userName != '' && this.props.userID!='' && this.props.userLocation!='' && this.props.userBio!=''){
      this.props.createUSER({userName,userID,userLocation, userBio, ImageDefault});
      }else{
        this.setState({
          errorMessage:'please fill the informations'
        })

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
         alignSelf:'center', 
         marginTop:10,
         padding:10,
         backgroundColor:'white',
       //  borderWidth:1,
         borderColor:'#05c7fc',
         padding:10,  
         borderRadius:90,


         
         }}>
         <ImageBlurLoading
         source={{
           uri: 'https://firebasestorage.googleapis.com/v0/b/pipocar-61cd8.appspot.com/o/groupCovers%2Fcef4c151ecd7c2fd46180b45fb5bc1a1.jpg?alt=media&token=8beea4de-e1fd-439d-8162-eb7bab61e41c'
         }}
         style={{
           width:50,
           height:50,
           borderRadius:90,

         }}
         
         />
       </View>


      <View 
      style={{
        marginBottom:70,
      }}>  
        <InputDataEdit
        placeholderTextColor="grey"
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
        <InputDataEdit
        placeholderTextColor="grey"
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
        <InputDataEdit
        placeholderTextColor="grey"
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
        <InputDataEdit
        placeholderTextColor="grey"
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
      <View
      style={{
        justifyContent:'center',
        alignSelf:'center',
        marginBottom:10,
        marginBottom:10
      }}
      >
      <Text
      style={{
        fontSize:13,
        color:'red',
        fontWeight:'bold'

      }}
      >{this.state.errorMessage}</Text></View>
      
{ this.props.loading === false ? (      
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
      </TouchableOpacity>) : 
      <View 
      style={{
        marginTop:20,
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
  
  const { loading, errorOncreateAccount, userName, userID, userLocation, userBio, userDateOfRegistration, ImageDefault} = auth;

  return{ loading, errorOncreateAccount, userName, userID, userLocation, userBio, userDateOfRegistration, ImageDefault};
}

export default connect(mapStateToProps, {
  userUPDATE_DATA,
  createUSER
 })(UserPersonalDataForm);