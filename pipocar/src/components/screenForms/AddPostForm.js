  
import React, {Component} from 'react';
import 
{ 
View,
Text,
ScrollView,
TouchableOpacity,
Image

} from 'react-native';
import 
{ 
Button,
InputForPosts
} from '../reusebleComponents/index';

import { EvilIcons } from '@expo/vector-icons';
import * as ImagePicker  from 'expo-image-picker';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import firebase from 'firebase';
import { Actions } from "react-native-router-flux";

/*
                <View>
                <InputPost
                autoCapitalize="none"
                placeholder="group name.."
                autoCorrect={false}
                multiline={true}
                //maxLength={20}
                value={this.state.caption}
                 onChangeText={(text) => this.setState({
                    caption:text,
                 })}  
                />
                <ButtonSmall
                 label="done"
                  onPress={this.onButtonPress.bind(this)}
                />
                </View>
*/

class AddPostForm extends Component {


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
                         
                        };
                    }

                    componentWillUnmount() {
                        this._isMounted = false;
                      }
            
                    componentDidMount() {
                        this._isMounted = true;
                      }
                    

  //Image Picker 
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

console.log('Unknown Error');
});
}
                //S4
                s4 = () => {
                    return Math.floor((1 + Math.random()) * 0x10000)
                      .toString(16)
                      .substring(1);
                  };
            
                //UploadPublish
                UploadPublish = () => {
           
                      this.uploadImage(this.state.uri);
            
       

    
                 
                }
                
                //Unique ID
                uniqueId = () => {
                    return (
                      this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4()
                    );
                  };
            
            
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
                        })
            
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
                        });
                    }, function(error) {
                        console.log('error with upload - '+error);
            
                    }, function(){
                        that.setState({props:100});
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                            that.processUpload(downloadURL)
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










    onButtonPress()
    {
       if(this.state.imageSelected) {
         this.UploadPublish();
         console.log("Working properly")
         console.log('ROOM NAME', this.state.caption);
         Actions.pop();
         Actions.refresh({});
        }else{
        console.log('Please give a name for the group and use an image!!!');
    }
       
    }

    render()
    {
        console.log("AddPost!!!")
        console.log(this.state.caption);
        return(
            <View style={styles.container}>
                <ScrollView style={{
                    flex:1,
                    
                }}>

            {!this.state.imageSelected ?
            (
                <View style={styles.CreateAgroupContainer}>
                <TouchableOpacity onPress={this.findNewImage}
                >

                

                
                
                    <EvilIcons name="camera" size={200} color="#dbdbdb" />

                 
              
                </TouchableOpacity>


                <View style={{
                 justifyContent:'center',
                 flex:1,
                  
                }}> 
                <Text style={styles.CreateAgroupDescription}>
                    tap on the camera to be able to upload a photo
                </Text>
                </View>
                </View>
            ) : (
                <View style={{
                    flex:1,
                    //marginTop:'10%'
                 
                }}>
                <View style={{ 
                flexDirection:'row', 
                padding:5
                }}>
                    
                <Image
                opacity={0.8}
                source={{
                    uri:this.state.uri,
                }}
                style={{
                    width:100,
                    height:100,
                    marginBottom:5,
                 //   borderRadius:10,

                }}
                
                />
                <InputForPosts
                autoCapitalize="none"
                placeholder="description about the photo.."
                autoCorrect={false}
                multiline={true}
                //maxLength={20}
                value={this.state.caption}
                 onChangeText={(text) => this.setState({
                    caption:text,
                 })}  
                />

                </View>

                <View style={{
                      padding:5
                                      

                }}>
                <Button
                 label="Post"
                  onPress={this.onButtonPress.bind(this)}

                />
                </View>
                </View>



                
            )
                }



                </ScrollView>
                
            </View>
        )
    }
}




export  {AddPostForm};

const styles = {
    container : {
        flex:1,
       justifyContent:'center',

    

    },
    CreateAgroupContainer : { 
        marginTop:'10%',
        alignItems:'center',
    },
    CreateAPostText : {
        fontSize :18,
        marginBottom:10,
        fontWeight:'bold',

    },
    CreateAgroupDescription : {
      //  textAlign:'center',
        color:'grey',
        fontSize :10,
        marginBottom:10,


    }
}