  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  Platform,
  KeyboardAvoidingView
} from "react-native";
import { GiftedChat, GiftedAvatar} from 'react-native-gifted-chat'
import  { addMessages, messageFETCH} from '../actions/ChatActions';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons'

import Send from '../../node_modules/react-native-gifted-chat/lib/Send';
class  MessageScreen extends Component {


constructor(props)
  {
      super(props);


      constructor(props)
      {
          super(props);
          this.state = {
              loggedin: false,
              imageSelected: false,
              uploading: false,
              caption: "",
              progress: 0,
              imageFromChat:'',
              loading:false,
           
          };
      }
      
  }



UNSAFE_componentWillMount()
{
  const { thread } = this.props;
  console.log('Thread!!!!!!',thread);
  this.props.messageFETCH(thread);

}

//OnSendMessage 
onSendMessage(messages=[])
{   
    const text = messages[0].text;
    const  currentUser = auth().currentUser.toJSON();
    const { thread } = this.props;

    firestore()
    .collection('MESSAGE_THREADS')
    .doc(thread._id)
    .collection('MESSAGES')
    .add({
        text,
        createdAt: new Date().getTime(),
       // image:this.state.imageFromChat,
        user : {
            _id: currentUser.uid,
            name: auth().currentUser.displayName,
            avatar: auth().currentUser.photoURL,//this.createUserAvatarUrl(), 
        },
        
    })


    firestore()
    .collection('MESSAGE_THREADS')
    .doc(thread._id)
    .set(
        {
        latestMessage: {
            text,
            image:this.state.imageFromChat,
            createdAt: new Date().getTime()
        }
        },
        { merge: true }
    )

    this.props.addMessages(messages);

    this.setState({
        imageSelected:'',
    })


   
}



renderSend = (props) => {
  return(

  <View style={{
     marginRight:10,
     marginLeft:5,
     marginBottom:10,
     flexDirection:'row'
  }}>
  
{ this.state.imageSelected === true  ?
  (
  
  <View>
      <TouchableOpacity 
      onPress={this.findNewImage}
      >
      <Image
      source={{
          uri:this.state.uri,
      
      }}
      style={{
          width:30,
          height:30,
          backgroundColor:'red',
          marginTop:'15%',
          marginRight:55,
          borderRadius:5,
      }}
      />
      </TouchableOpacity>
  </View>)   : 
  <View style={{
    flexDirection:'row',
    alignSelf:'center'
  }}> 

  <EvilIcons 
  //onPress={this.findNewImage}
  style={{
  marginTop:'22%',
  marginRight:10,
  }}
  name="image" 
  size={36} 
  color="black" 
  /> 
<MaterialCommunityIcons 
  style={{
    marginTop:'22%',
    marginRight:10,
  }}

name="sticker-emoji" size={27} color="black" />
</View>
  
  
  }




  <Send {...props}>
  <View style={styles.sendingContainer}>
  <FontAwesome 
  name="send" 
  size={25} 
  color={'#00bbff'} 
  />

  
  </View>
  </Send>


  </View>

  );

}



render(){ 
  console.log('MessageScreen');
  return (
    <View 
    style={{
      flex:1
    }}>
    <GiftedChat
   // showUserAvatar
    //showAvatarForEveryMessage
    renderUsernameOnMessage
    minComposerHeight={40}
    minInputToolbarHeight={60}
    messages={this.props.messages}
    renderSend={this.renderSend}
    onSend={this.onSendMessage.bind(this)}
    user = {{
      _id: auth().currentUser.uid,

    }}

    />
    {
      Platform.OS === 'android' && 
(      <KeyboardAvoidingView 

        behavior="padding" 
      keyboardVerticalOffset={100}
      />)
    }
  </View>

 
  );
}
}



const mapStateToProps = ({chat}) => {



  const { messages }  = chat;

  return{ messages  };
}



export default connect(mapStateToProps,{
  addMessages, 
  messageFETCH



})(MessageScreen);



const styles = {
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    justifyContent:'space-between',
    marginRight:20

    //backgroundColor:'red'
  
 
  }
};