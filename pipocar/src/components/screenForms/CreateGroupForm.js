  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity,
  Image,
  FlatList,
  Alert
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
import { Picker} from '@react-native-community/picker';

import { 
  Actions
  } from 'react-native-router-flux';
class  CreateGroupForm extends Component {
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
          imageURI:'https://firebasestorage.googleapis.com/v0/b/pipocar-61cd8.appspot.com/o/groupCovers%2Fcef4c151ecd7c2fd46180b45fb5bc1a1.jpg?alt=media&token=8beea4de-e1fd-439d-8162-eb7bab61e41c',
          category:'Travel',
          groupname:''
      };
  }



  data = [
    {
        travel : 'Travel',
        key:1,
    
        healthAndwellness : 'Education',
        key:2,

        beauty : 'MeetMe',
        key:3,
        
        food_And_drink : 'Food',
        key:4,

        motivational_quotes: 'Drinks',
        key:5,

        sport : 'Sport',
        key:6,
        
        other : 'Other',
        key:7,


        
    }
    
    
    ]





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
            
  var groupObject = {
      groupcover:imageUrl,

  }

  //Group field
      
      firestore()
      .collection('MESSAGE_THREADS')
      .add({
          name: this.state.groupname,
          groupcover: groupObject,
          category: this.state.category,
          author: auth().currentUser.uid,
          latestMessage: {
              text: `${this.state.groupname} created. Welcome!`,
              createdAt: new Date().getTime(),
          }
      })
      .then(docRef => { 
          docRef
          .collection('MESSAGES')
          .add({
              text:`${this.state.groupname} created by ${ auth().currentUser.displayName } . Welcome!`,
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
  
  

  Actions.pop();
  Actions.refresh({});
}




onButtonPress()
{
  Alert.alert(
    this.state.title,
    `Make sure all the iformation is correct before create it`,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => { 
            this.UploadPublish();

       }}
    ],
    { cancelable: false }
  );
  

   
     

   
}

























render(){ 
  console.log('AddPostForm');
  return (
    <View style={{ marginLeft:10, marginRight:10}}>
      <View style={{
        alignSelf:'center',
        marginTop:10,
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
          width:40,
          height:40,
          alignSelf:'center',
          justifyContent:'center'

        }}
        
        />
        </TouchableOpacity>
 

      </View>
      <View style={{ 
        alignSelf:'center', 
        marginTop:10}}>
      <Text style={{ fontWeight:'bold', color:'grey'}}>Share your picture with others</Text>
      </View>
      
      <View>
      <FlatList
        data={this.data}
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={ item => item.key.toString()}
        //numColumns={3}
        horizontal 
        renderItem={({item}) => {

          return(
            <View style={{ 
              flexDirection:'row', 
              marginTop:20,
              //backgroundColor:'red',
              height:30,
              
              }}>
              <TouchableOpacity onPress={()=> this.setState({ category: item.travel})}>
              <View style={styles.categoryContainer1}>
                 <Text style={styles.categoryText1}>@{item.travel}</Text>
              </View>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={()=> this.setState({ category: item.healthAndwellness})}>
              <View style={styles.categoryContainer2}>
                 <Text style={styles.categoryText2}>@{item.healthAndwellness}</Text>
              </View>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={()=> this.setState({ category: item.beauty})}>
              <View style={styles.categoryContainer3}>
                 <Text style={styles.categoryText3}>@{item.beauty}</Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> this.setState({ category: item.food_And_drink})}>
              <View style={styles.categoryContainer4}>
                 <Text style={styles.categoryText4}>#{item.food_And_drink}</Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> this.setState({ category: item.motivational_quotes})}>
              <View style={styles.categoryContainer5}>
                 <Text style={styles.categoryText5}>#{item.motivational_quotes}</Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=> this.setState({ category: item.sport})}>
              <View style={styles.categoryContainer7}>
                 <Text style={styles.categoryText7}>#{item.sport}</Text>
              </View>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={()=> this.setState({ category: item.other})}>
              <View style={styles.categoryContainer6}>
                 <Text style={styles.categoryText6}>#{item.other}...</Text>
              </View>
              </TouchableOpacity>
              
              
            </View>
          )

        }}
        
        
        />
      </View>

      <View style={{ 
        alignSelf:'center',
        marginTop:10,
        flexDirection:'row'
        }}>
      <Text>Category : </Text>
      <Text style={{ fontWeight:'bold'}}>{this.state.category}</Text>
      </View>





      <View style={{ 
      //  flex:1, 

        }}>
        <InputForPosts
        autoCapitalize="none"
        placeholder="My group"
        autoCorrect={false}
        maxLength={40}
        value={this.state.groupname}
        onChangeText={(text) => this.setState({
           groupname:text,
        })} 
        />
      </View>
      <View>




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



export  default CreateGroupForm;


const styles = { 
  container:{
    flex:1,

  //  justifyContent:'center',
   // alignSelf:'center'
  },
  categoryText1:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:'#05c7fc'
  },
  categoryText2:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:'#05c7fc'

  },
  categoryText3:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:'#05c7fc'
  },
  categoryText4:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:'#05c7fc'
  },
  categoryText5:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:'#05c7fc'
  },  
  categoryText6:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:'#05c7fc'
  },  
  categoryText7:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:'#05c7fc'
  },
  categoryContainer1:{
   // backgroundColor:'#00d9ff',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',



  },
  categoryContainer2:{
   //backgroundColor:'#cbffbf',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer3:{
  //  backgroundColor:'#ffc9fc',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer4:{
  // backgroundColor:'#ffea00',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer5:{
  //  backgroundColor:'#ff6a00',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer6:{
 //  backgroundColor:'#ff005d',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer7:{
//   backgroundColor:'#00ddff',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },

}