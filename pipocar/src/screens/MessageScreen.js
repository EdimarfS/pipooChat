  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput
} from "react-native";
import { GiftedChat } from 'react-native-gifted-chat'
import  { addMessages, messageFETCH} from '../actions/ChatActions';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Send from '../../node_modules/react-native-gifted-chat/lib/Send';
import storage from '@react-native-firebase/storage';
import 
{ 
Spinner
} from '../components/reusebleComponents/index';
import ImageModal from 'react-native-image-modal';
import { Modalize } from 'react-native-modalize';





class  MessageScreen extends Component {


constructor(props)
  {
          super(props);


          this.modalizeRef = React.createRef();
          this.state = {
              loggedin: false,
              imageSelected: false,
              uploading: false,
              caption: "",
              progress: 0,
              imageFromChat:'',
              loading:false,
              messageFetched:false,
              imageID: this.uniqueId(),
              gifs:[],
              term:'love',

             // imageURI:'https://firebasestorage.googleapis.com/v0/b/pipocar-61cd8.appspot.com/o/groupCovers%2Fcef4c151ecd7c2fd46180b45fb5bc1a1.jpg?alt=media&token=8beea4de-e1fd-439d-8162-eb7bab61e41c'
    
           
          };

      
  }



UNSAFE_componentWillMount()
{
  const { thread } = this.props;
  console.log('Thread!!!!!!',thread);
  this.props.messageFETCH(thread);
  this.fetchGifs();

}


//Open Modal
onOpen()
{
    this.modalizeRef.current?.open();
}
//Close Modal
onClose()
{
    this.modalizeRef.current?.close();
}


renderItem = (item) => (
  <View
  style={{
    flex:1,
  }}>
      <Image
      resizeMode='contain'
      style={{
        width:100,
        height:100,
        backgroundColor:'red'
      }}
      source={{uri: item.images.original.url}}
    />



  </View>
);


//Fetching Giffs 

fetchGifs =  async () => {
  try { 
    const API_KEY ='fS3Y7BGjQUiHjxsnJaT147eECTrHayeV';
    const BASE_URL = 'http://api.giphy.com/v1/gifs/search';
    const resJson = await fetch(`${BASE_URL}?api_key=${API_KEY}&q=${this.state.term}`);
    const res = await resJson.json();
    this.setState({
      gifs: res.data,
    })
    console.log('GIPHY, ', this.state.gifs);


  }catch(error) { 
    console.log(error);
  }
}

onEdit = (newTerm) =>  {
  this.setState({
    term:newTerm
  });
  this.fetchGifs();
}


//Check Permition
_checkPermissions = () => {
  check(PERMISSIONS.IOS.LOCATION_ALWAYS)
  .then((result) => {
  switch (result) {
  case RESULTS.UNAVAILABLE:
  console.log(
  'This feature is not available (on this device / in this context)',
  );
  break;
  case RESULTS.DENIED:
  console.log(
  'The permission has not been requested / is denied but requestable',
  );
  break;
  case RESULTS.GRANTED:
  console.log('The permission is granted');
  break;
  case RESULTS.BLOCKED:
  console.log('The permission is denied and not requestable anymore');
  break;
  }
  })
  .catch((error) => {
  // …
  console.log('Unknown Error', error);
  });
  } 


//S4
s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

//Unique ID
uniqueId = () => {
return (
  this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4()
);
};


  //ImagePicker
  findNewImage = async () => {
    this._checkPermissions();
    this.setState({
      imageSelected: false,

      
  })


    //Here we open the camera
    await ImagePicker.openPicker({
        mediaTypes: 'Images',
        width: 400,
        height: 400,
        cropping: true,

        
    }).then(image => {
      this.setState({
        imageSelected: true,
        imageId: this.uniqueId(),
        imageFromChat: image.path,
        loading: true,
        
    })


    this.uploadImage(this.state.imageFromChat);
    
    })
    .catch(error => {
      console.log(error)


  })
}

//UploadPublish
  UploadPublish = () => {

    this.uploadImage(this.state.imageURI);
}

//UploadImage
uploadImage = async (uri) => {
  var that = this;
  var imageID = this.state.imageID;
  console.log('ImageID!!!', imageID)
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(uri)[1];
  console.log('EXTENSION!!!', ext)
  this.setState({
      currentFileType: ext,
      uploading: true
    });

  const response = await fetch(uri);
  const blob = await response.blob();
  var FilePath = imageID+'.'+that.state.currentFileType;
  console.log("FilePath!!!!!!!!!!", FilePath); 
  const uploadTask =  storage().ref('MESSAGES/img').child(FilePath).put(blob);
  uploadTask.on('state_changed', snapshot => {
      var progress = (( snapshot.bytesTransferred / snapshot.totalBytes)*100).toFixed(0);
      console.log('Upload is ' + progress + "% complete");
      this.setState({
        progress:progress,
        loading:true,
      
    });

  }, function(error) {
      console.log('error with upload - '+error);

  }, function(){
      that.setState({progress:100});
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
         // that.processUpload(downloadURL)
            that.setState({
            imageFromChat:downloadURL,
            loading:false,
        }) 
      })
  }
  )
  


}




//Process Upload 
processUpload = (imageUrl) => {

  var messageObject = {

      url: imageUrl,
  

  }
  //Group field --> FIRESTORE
  firestore().collection('MESSAGE_CHAT')
  .add(messageObject);
                                        
                      
  this.setState({
    uploading: false,
    imageSelected: false,
    caption:'',
    uri:'',
}) 


//Actions Here
Actions.pop();
Actions.refresh({});
}


//OnSendMessage 
onSendMessage(messages=[])
{   
    const text = messages[0].text;
    const  currentUser = auth().currentUser.toJSON();
    const { thread } = this.props;


    this.props.addMessages(messages);


    firestore()
    .collection('MESSAGE_THREADS')
    .doc(thread._id)
    .collection('MESSAGES')
    .add({
        text,
        createdAt: new Date().getTime(),
         image:this.state.imageFromChat,
      //   image:'https://media.giphy.com/media/8X0djS009EUv600mkv/giphy.gif',
        sent: true,
        // Mark the message as received, using two tick
        received: true,
        // Mark the message as pending with a clock loader
      //  penfing: true,
        // Any additional custom parameters are passed through
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
    ).then(()=>{
      this.setState({
        imageSelected:'',
        imageFromChat:'',
    })
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
          uri:this.state.imageFromChat,
      
      }}
      style={{
          width:30,
          height:30,
          backgroundColor:'red',
          marginTop:'15%',
          marginRight:55,
         // borderRadius:5,
      }}
      />
      </TouchableOpacity>
  </View>)   : 
  <View style={{
    flexDirection:'row',
    alignSelf:'center'
  }}> 

  <EvilIcons 
  onPress={this.findNewImage}
  style={{
  marginTop:'22%',
  marginRight:10,
  }}
  name="image" 
  size={36} 
  color="black" 
  /> 

<MaterialCommunityIcons 
  onPress={this.onOpen.bind(this)}
  style={{
    marginTop:'22%',
    marginRight:10,
  }}

name="sticker-emoji" size={27} color="black" />
</View>
  
  
  }


  <Send {...props}>
  <View style={styles.sendingContainer}>
    <Text
    style={{
      fontWeight:'bold',
      fontSize:16,
      color:'#05c7fc'
    }}
    >Send</Text>

  
  </View>
  </Send>


  </View>

  );

}

//RenderImage 

renderMessageImage = (props) => {
  return (
      <View style={{
        alignSelf:'center',
        marginTop:10,
      }}>
{ this.props.messageFetch === true ? (      <ImageModal
        resizeMode="contain"
      //  imageBackgroundColor="white"
        style={{
          width:150,
          height:150,
          marginLeft:10,
          marginRight:10,
         // borderRadius:10,
          alignSelf:'center',
  
        }}

        source={{ uri: props.currentMessage.image }}
      />):
      <View
      style={{
        backgroundColor:'white',
        marginLeft:10,
        marginRight:10,
        width:150,
        height:150,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center'
      }}> 
      <Spinner/>
        
      </View>}
      </View>
  );
};



renderHeader = () => {
  return(
    <View
    style={{
      flex:1,
    }}
    >
      <TextInput
      defaultValue="Dog"
      autoCapitalize="none"
      placeholder="Search Giphy"
      style={{
        backgroundColor:'lightgrey',
        width:'100%',
        height:40,
        borderRadius:5,
        padding:10,
      }}
      placeholderTextColor='black'
      value={this.state.term}
      onChangeText={this.onEdit.bind(this)}
/>
      

    </View>
  )
}

render(){ 
  console.log('MessageScreen');
  return (
    <View 
    style={{
      flex:1
    }}>

{ this.state.loading === false ? 

    <GiftedChat
   // showUserAvatar
    //showAvatarForEveryMessage
    renderMessageImage={this.renderMessageImage}
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
    : <Spinner/>}
    {
      Platform.OS === 'android' && 
(      <KeyboardAvoidingView 

        behavior="padding" 
      keyboardVerticalOffset={-10000}
      />)
    }



<Modalize
    style={{
        flex:1,
    }}
    modalStyle={{
    // backgroundColor:'trasparent'
    }}
    ref={this.modalizeRef}
    modalHeight={500}
    snapPoint={500}
            
    >
 <FlatList
        data={this.state.gifs}
        ListHeaderComponent={this.renderHeader}
        numColumns={3}
        renderItem={({item}) => (
          <View
          style={{
            flex:1/3,
          }}>
          <TouchableOpacity 
          onPress={()=>{
            this.setState({
              imageFromChat:item.images.original.url,
              imageSelected:true
            })
          this.onClose();
          }}
          >
          <Image
            resizeMode='contain'
            style={{
              width:100,
              height:100,
             // backgroundColor:'red'
            }}
            source={{uri: item.images.original.url}}
          />
          </TouchableOpacity>
          </View>
          
        )}
      /> 
      
    </Modalize> 









  </View>

 
  );
}
}



const mapStateToProps = ({chat}) => {



 const { messages, messageFetch }  = chat;

  return{ messages, messageFetch  };
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
    marginRight:20,
    marginLeft:10,


    //backgroundColor:'red'
  
 
  }
};