  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity,
} from "react-native";
import { 
InputForPosts,
Button
} from '../reusebleComponents/index';
import ImagePicker from 'react-native-image-crop-picker';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
class  AddPostForm extends Component {
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
                  let result = await ImagePicker.openPicker({
                      mediaTypes: 'Images',
                      width: 300,
                      height: 400,
                      cropping: true,
  

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


render(){ 
  console.log('AddPostForm');
  return (
    <View style={{ marginLeft:10, marginRight:10}}>
      <View>
        <TouchableOpacity 
        onPress={this.findNewImage}
        style={{
          width:100,
          height:100,
          backgroundColor:'red',
          justifyContent:'center',
          alignSelf:'center',
          marginTop:'30%',
        }}>
        </TouchableOpacity>
      </View>
      <View style={{ alignSelf:'center', marginTop:10}}>
      <Text>Description of the picture</Text>
      </View>
      <View>
        <InputForPosts
        maxLength={10}
        
        />
      </View>
      <View style={{
        marginTop:60,
      }}>
        <Button
        label="Post"
        />
      </View>
      


    </View>

 
  );
}
}



export  default AddPostForm;
