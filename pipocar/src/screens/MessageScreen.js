  
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
        image:this.state.imageFromChat,
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



render(){ 
  console.log('MessageScreen');
  return (
    <View 
    style={{
      flex:1
    }}>
    <GiftedChat
    renderUsernameOnMessage
    messages={this.props.messages}
    onSend={this.onSendMessage.bind(this)}
    user = {{
      _id: auth().currentUser.uid,

    }}

    />
    {
      Platform.OS === 'android' && 
      <KeyboardAvoidingView 
      behavior="padding" 
      keyboardVerticalOffset={-1000}
      />
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
