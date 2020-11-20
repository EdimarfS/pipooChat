  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity,
  Image
} from "react-native";
import { 
InputForPosts,
Button
} from '../reusebleComponents/index';
import ImagePicker from 'react-native-image-crop-picker';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ImageBlurLoading from 'react-native-image-blur-loading';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { 
  Actions
  } from 'react-native-router-flux';
class  AddPostForm extends Component {
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
          imageURI:'https://firebasestorage.googleapis.com/v0/b/pipocar-61cd8.appspot.com/o/groupCovers%2Fcef4c151ecd7c2fd46180b45fb5bc1a1.jpg?alt=media&token=8beea4de-e1fd-439d-8162-eb7bab61e41c'
      };
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
    console.log('Unknown Error', error);
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

this.uploadImage(this.state.imageURI);





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
await ImagePicker.openPicker({
mediaTypes: 'Images',
width: 400,
height: 400,
cropping: true,


}).then(image => {
this.setState({
imageSelected: true,
imageId: this.uniqueId(),
imageURI: image.path,

})
}).catch(error => {
console.log(error)
this.setState({
imageSelected: false
});

})
}



//Upload File ----------------------------------------->

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
  const uploadTask =  storage().ref('POST/img').child(FilePath).put(blob);
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

  var userID = auth().currentUser.uid;
  var userName = auth().currentUser.displayName;
  var imageID = this.state.imageID;
  var caption = this.state.caption;
  var dateTime = Date.now();
  var timestamp = Math.floor(dateTime / 1000);
  var profilepicture = auth().currentUser.photoURL;
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
  firestore().collection('POST')
  .add(photoObject);
  //set user photos object
  database().ref(`/users/${userID}/photos/${imageID}`)
  .set(photoObject);
                                        
                      

  this.setState({
      uploading: false,
      imageSelected: false,
      caption:'',
      imageURI:'https://firebasestorage.googleapis.com/v0/b/pipocar-61cd8.appspot.com/o/groupCovers%2Fcef4c151ecd7c2fd46180b45fb5bc1a1.jpg?alt=media&token=8beea4de-e1fd-439d-8162-eb7bab61e41c'
    }) 
    
    


//Actions Here
Actions.pop();
Actions.refresh({});
}




onButtonPress()
{

     this.UploadPublish();

   
}

























render(){ 
  console.log('AddPostForm');
  return (
    <View style={{ marginLeft:10, marginRight:10}}>
      <View style={{
        alignSelf:'center',
        marginTop:20,
      }}>

        
        <TouchableOpacity 
        style={{
          borderWidth:1,
          borderColor:'#05c7fc',
          padding:10,
          
        }}
        onPress={this.findNewImage}>
        <ImageBlurLoading
        thumbnailSource={{uri:this.state.imageURI}}
        source={{uri:this.state.imageURI}}
        style={{
          width:106,
          height:100,
          alignSelf:'center',
          justifyContent:'center'

        }}
        
        />
        </TouchableOpacity>
      </View>
      <View style={{ alignSelf:'center', marginTop:10}}>
      <Text style={{ fontWeight:'bold', color:'grey'}}>Share your picture with others</Text>
      </View>
      <View>
        <InputForPosts
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={10}
        value={this.state.caption}
        onChangeText={(text) => this.setState({
           caption:text,
        })} 
        
        />
      </View>
      <View style={{
        marginTop:60,
      }}>
        <Button
        onPress={this.onButtonPress.bind(this)}
        label="Post"
        />
      </View>
      


    </View>

 
  );
}
}



export  default AddPostForm;
