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
Input
} from '../reusebleComponents/index';


import { EvilIcons } from '@expo/vector-icons';
import * as ImagePicker  from 'expo-image-picker';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import firebase from 'firebase';
import { Actions } from "react-native-router-flux";

class CreateGroupForm extends Component {


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
                            roomName:'',
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
                if(this.state.roomName!=='')
                {
                      this.uploadImage(this.state.uri);
                }
       

    
                 
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
                    const uploadTask = firebase.storage().ref('chatROOMS/img').child(FilePath).put(blob);
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
            
                    var groupObject = {
                        photoURL:imageUrl,
            
                    }
        
                    //Group field
                        firebase
                        .firestore()
                        .collection('MESSAGE_THREADS')
                        .add({
                            name: this.state.roomName,
                            groupcover: groupObject,
                            latestMessage: {
                                text: `${this.state.roomName} created. Welcome!`,
                                createdAt: new Date().getTime(),
                            }
                        })
                        .then(docRef => { 
                            docRef
                            .collection('MESSAGES')
                            .add({
                                text:`${this.state.roomName} created. Welcome!`,
                                createdAt: new Date().getTime(),
                                system: true,
                                
                            })

                        })
        
            
                    this.setState({
                        uploading: false,
                        imageSelected: false,
                        caption:'',
                        uri:'',
                    })        
                }










    onButtonPress()
    {
       if(this.state.imageSelected && this.state.roomName!=='') {
         this.UploadPublish();
         console.log("Working properly")
         console.log('ROOM NAME', this.state.roomName);
         Actions.pop();
         Actions.refresh({});
        }else{
        console.log('Please give a name for the group and use an image!!!');
    }
       
    }

    render()
    {
        console.log("Create Group!!!")
        return(
            <View style={styles.container}>
                <ScrollView style={{
                    flex:1,
                    
                }}>
                <View style={styles.CreateAgroupContainer}>
                <TouchableOpacity onPress={this.findNewImage}
                >
                {this.state.imageSelected ? 
                (
                
                <Image
                source={{
                    uri:this.state.uri,
                }}
                style={{
                    width:100,
                    height:100,
                    marginBottom:10,
                }}
                
                />) : 
                
                (
                    <EvilIcons name="camera" size={90} color="black" />

                ) }
              
                </TouchableOpacity>
                <Text style={styles.CreateAgroupText}>
                    new chat room
                </Text>

                <View style={{
                 justifyContent:'center',
                 flex:1,
                  
                }}> 
                <Text style={styles.CreateAgroupDescription}>
                create a group of an intersting topic or to hangout with friends
                </Text>
                </View>
                </View>
                <Input
                autoCapitalize="none"
                placeholder="group name.."
                autoCorrect={false}
                maxLength={20}
                value={this.state.roomName}
                 onChangeText={(text) => this.setState({
                     roomName:text,
                 })}  
                />
                <Button
                 label="done"
                  onPress={this.onButtonPress.bind(this)}

                />

                </ScrollView>
                
            </View>
        )
    }
}




export  {CreateGroupForm};

const styles = {
    container : {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    
    

    },
    CreateAgroupContainer : { 
        marginTop:'50%',
        alignItems:'center',
    },
    CreateAgroupText : {
        fontSize :28,
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