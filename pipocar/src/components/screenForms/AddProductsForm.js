  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity,
  Image,
  FlatList
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
          category:'Vehicles',
          groupname:'',
          condition:'New',
      };
  }



  data = [
    {
       vehicles : 'Vehicles',
        key:1,
    
        properties : 'Properties',
        key:2,

        apperel : 'Apperel',
        key:3,
        
        classifieds : 'Classifieds',
        key:4,

        electronics: 'Electronics',
        key:5,

        entertaiment : 'Entertaiment',
        key:6,
        
        family : 'Family',
        key:7,

        freestuffs : 'Free Stuffs',
        key:8,
    }

    ];



    condition_data = [
        {
            new: 'New',
            key:1,
        
            used_good : 'Used Good',
            key:2,
    
            used_fair : 'Used Fair',
            key:3,
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
          latestMessage: {
              text: `${this.state.groupname} created. Welcome!`,
              createdAt: new Date().getTime(),
          }
      })
      .then(docRef => { 
          docRef
          .collection('MESSAGES')
          .add({
              text:`${this.state.groupname} created. Welcome!`,
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

     this.UploadPublish();
     

   
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
          width:106,
          height:100,
          alignSelf:'center',
          justifyContent:'center'

        }}
        
        />
        </TouchableOpacity>
 

      </View>
      <View style={{ 
        alignSelf:'center', 
        marginTop:10}}>
      <Text style={{ fontWeight:'bold', color:'grey'}}>Create a product</Text>
      </View>
      
      <View>
      <FlatList
    data={this.data}
    showsVerticalScrollIndicator ={false}
    showsHorizontalScrollIndicator={false}

    showsHorizontalScrollIndicator={false}
    keyExtractor={ item => item.key.toString()}
    //numColumns={3}
    horizontal 
    renderItem={({item}) => {

      return(
        <View style={{ 
          flexDirection:'row', 
          marginTop:10,
       //   backgroundColor:'blue'
          //backgroundColor:'red',
          }}>
          <TouchableOpacity onPress={()=> this.setState({ category: item.vehicles})}>
          <View style={styles.categoryContainer1}>
             <Text style={styles.categoryText1}>#{item.vehicles}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.setState({ category: item.properties})}>
          <View style={styles.categoryContainer2}>
             <Text style={styles.categoryText2}>#{item.properties}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.setState({ category: item.apperel})}>
          <View style={styles.categoryContainer3}>
             <Text style={styles.categoryText3}>#{item.apperel}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.setState({ category: item.classifieds})}>
          <View style={styles.categoryContainer4}>
             <Text style={styles.categoryText4}>#{item.classifieds}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.setState({ category: item.electronics})}>
          <View style={styles.categoryContainer5}>
             <Text style={styles.categoryText5}>#{item.electronics}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.setState({ category: item.entertaiment})}>
          <View style={styles.categoryContainer7}>
             <Text style={styles.categoryText7}>#{item.entertaiment}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.setState({ category: item.family})}>
          <View style={styles.categoryContainer6}>
             <Text style={styles.categoryText6}>#{item.family}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.setState({ category: item.freestuffs})}>
          <View style={styles.categoryContainer6}>
             <Text style={styles.categoryText6}>#{item.freestuffs}</Text>
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


      <FlatList
    data={this.condition_data}
    showsVerticalScrollIndicator ={false}
    showsHorizontalScrollIndicator={false}

    showsHorizontalScrollIndicator={false}
    keyExtractor={ item => item.key.toString()}
    //numColumns={3}
    horizontal 
    renderItem={({item}) => {

      return(
        <View style={{ 
          flexDirection:'row', 
          marginTop:10,
       //   backgroundColor:'blue'
          //backgroundColor:'red',
          }}>
          <TouchableOpacity onPress={()=> this.setState({ condition: item.new})}>
          <View style={styles.categoryContainer1}>
             <Text style={styles.categoryText1}>#{item.new}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.setState({ condition: item.used_good})}>
          <View style={styles.categoryContainer2}>
             <Text style={styles.categoryText2}>#{item.used_good}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.setState({ condition: item.used_fair})}>
          <View style={styles.categoryContainer3}>
             <Text style={styles.categoryText3}>#{item.used_fair}</Text>
          </View>
          </TouchableOpacity>
          
          
        </View>

      )

    }}
    
    
    />


      <View style={{ 
        alignSelf:'center',
        marginTop:10,
        flexDirection:'row'
        }}>
      <Text>Condition : </Text>
      <Text style={{ fontWeight:'bold'}}>{this.state.condition}</Text>
      </View>

      






      <View style={{ 
      //  flex:1, 
        marginBottom:50,
        }}>
        <InputForPosts
        placeholder="Title"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={20}
        value={this.state.groupname}
        onChangeText={(text) => this.setState({
           groupname:text,
        })} 
        />
      </View>


      <View style={{ 
      //  flex:1, 
      marginBottom:50,

        }}>
        <InputForPosts
        placeholder="Price"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={20}
        value={this.state.groupname}
        onChangeText={(text) => this.setState({
           groupname:text,
        })} 
        />
      </View>

      <View style={{ 
      //  flex:1, 
      marginBottom:50,

        }}>
        <InputForPosts
        placeholder="Category"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={20}
        value={this.state.groupname}
        onChangeText={(text) => this.setState({
           groupname:text,
        })} 
        />
      </View>

      <View style={{ 
      //  flex:1, 
      //marginBottom:50,

        }}>
        <InputForPosts
        placeholder="Location"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={20}
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