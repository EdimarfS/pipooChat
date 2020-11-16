  
import React, { Component} from 'react';
import { View, Text, Image, ViewPropTypes, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {connect} from 'react-redux';
import * as ImagePicker  from 'expo-image-picker';
import  * as Permissions  from 'expo-permissions'; 
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from 'firebase';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Send from '../../../node_modules/react-native-gifted-chat/lib/Send';
//import Send from '../../../node_modules/react-native-gifted-chat/lib/Send';
import { Spinner } from '../../components/reusebleComponents/index';
import  { addMESSAGES, messageFETCH} from '../../actions/ChatActions';



class MessageForm extends Component {


    constructor(props)
    {
        super(props);


        constructor(props)
        {
            super(props);
            this.state = {
                loggedin: false,
                imageID: this.uniqueId(),
                imageSelected: false,
                uploading: false,
                caption: "",
                progress: 0,
                imageFromChat:'',
                loading:false,
             
            };
        }
        
    }

    
    //User Avatar 
    
    _isMounted = false;

    UNSAFE_componentWillMount()
    {   
        const { thread } = this.props;
        this._isMounted = false;  
        if(!this.props.loading)
        {
        this.props.messageFETCH(thread);
        }

        console.log('USER NAME!!!!!!!',firebase.auth().currentUser.displayName)

    }
componentDidMount()
{
    this._isMounted = true;  
    
}
    
//Send image into the Message

                //Image Picker 
                _checkPermissions = async () => {
                    const { status } = await Permissions.askAsync(Permissions.CAMERA);
                    this.setState({ camera:status});
                    
            
                    const { statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                    this.setState({ camerRoll: statusRoll});
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
            
            
                //UploadPublish
                UploadPublish = () => {
           
                      this.uploadImage(this.state.uri);
            
                 
                }
                

            
                //ImagePicker
                findNewImage = async () => {
                    this._checkPermissions();
            
            
                    //Here we open the camera
                    let result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: 'Images',
                        allowsEditing: true,
                        quality:1,

                    });
                    console.log(result);
                    if(!result.cancelled)
                    {
                        console.log('upload image');
                        this.setState({
                            imageSelected: true,
                            imageId: this.uniqueId(),
                            uri: result.uri

                        });
                        this.uploadImage(this.state.uri);

                       

                        
            
                    }else{
                        console.log('cancel');
                        this.setState({
                            imageSelected: false
                          });
                    }
                }
            
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
                    const uploadTask =  firebase.storage().ref('POST/img').child(FilePath).put(blob);
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
                        that.setState({props:100});
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

                
                
            
                processUpload = (imageUrl) => {

                    var userID = firebase.auth().currentUser.uid;
                    var userName = firebase.auth().currentUser.displayName;
                    var imageID = this.state.imageID;
                    var caption = this.state.caption;
                    var dateTime = Date.now();
                    var timestamp = Math.floor(dateTime / 1000);
                    var profilepicture = firebase.auth().currentUser.photoURL;
                    var photoObject = {
                        author: userID,
                        userName: userName,
                        caption : caption,
                        posted: timestamp,
                        url: imageUrl,
                        profilepicture: profilepicture,
                        likes:0,
                        comments_number: 0,
                        liked: false,
                    

                    }
                    //Group field --> FIRESTORE
                    firebase.firestore().collection('POST')
                    .add(photoObject);
                    //set user photos object
                    firebase.database().ref(`/users/${userID}/photos/${imageID}`)
                    .set(photoObject);
                                        
        
            
                    this.setState({
                        uploading: false,
                        imageSelected: false,
                        caption:'',
                        uri:'',
                    })        
                }
                
            
        







        onSendMessage(messages=[])
    {   
        const text = messages[0].text;

        const  currentUser = firebase.auth().currentUser.toJSON();
        const { thread } = this.props;

    
        firebase
        .firestore()
        .collection('MESSAGE_THREADS')
        .doc(thread._id)
        .collection('MESSAGES')
        .add({
            text,
            createdAt: new Date().getTime(),
            image:this.state.imageFromChat,
            user : {
                _id: currentUser.uid,
                name: firebase.auth().currentUser.displayName,
                avatar: firebase.auth().currentUser.photoURL,//this.createUserAvatarUrl(), 
            },
            
        })

        firebase
        .firestore()
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

        this.props.addMESSAGES(messages);

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
    
        <EvilIcons 
        onPress={this.findNewImage}
        style={{
        marginTop:'10%',
        marginRight:50,
        }}
        name="image" 
        size={45} 
        color="black" 
        /> }

  


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


  //QuickReplies
  onQuickReply(quickReply) {
    if(quickReply.contentType === "text") {
          // send text message
     } else if (quickReply.contentType === "location") {
         // send location
     } else if (quickReply.contentType === "camera") {
         // open camera then send video / image
     }
     // infinite possibilities 
 }






    render()
    {
        return(

  
            <View style={{ flex: 1 }}>

            
{  this.state.loading === false ?   
           <GiftedChat 
           // showUserAvatar={true}
            style={{flex: 1}}
            renderUsernameOnMessageonTop
            isLoadingEarlier
            renderUsernameOnMessage
            minComposerHeight={40}
            minInputToolbarHeight={60}
            //renderUsernameOnMessage={true}
            alwaysShowSend
            messages={this.props.messages}
            onSend={this.onSendMessage.bind(this)}
            renderSend={this.renderSend}
            onQuickReply={quickReply => this.onQuickReply(quickReply)}
            keyboardShouldPersistTaps='never'

             user = {{
                _id: firebase.auth().currentUser.uid,
                
         
            }} 
            /> : (
            <View style={{
                marginTop:'70%',
            }}>
                <Spinner/>
            </View>
            )}
            {
               Platform.OS === 'android' && (<KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={-1000}/>)
            }

         </View>


        )
    }
}



const mapStateToProps = ({chat}) => {

    const { messages }  = chat;

    return{ messages  };
}



export default connect(mapStateToProps,{
    addMESSAGES,
    messageFETCH,

})(MessageForm);


const styles = {
    sendingContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row',
      justifyContent:'space-between',

      //backgroundColor:'red'
    
   
    }
  };