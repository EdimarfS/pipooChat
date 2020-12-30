  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  TextInput
} from "react-native";
import { 
InputForPosts,
Button,
InputDataEdit,
Spinner
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
class  AddEventsForm extends Component {
  constructor(props)
  {
      super(props);
      this.state = {
          loggedin: false,
          imageID: this.uniqueId(),
          imageSelected: false,
          uploading: false,
          progress: 0,
          imageURI:'https://firebasestorage.googleapis.com/v0/b/pipocar-61cd8.appspot.com/o/groupCovers%2Fparty.jpg?alt=media&token=faa0df66-56f4-4e85-9bc4-93c2d6fa070f',
          title:'My event',
          price:'0',
          category:'Night Party',
          condition:'New',
          location:'Angola',
          website: '',
          nextStep:false,
          finishStep:false,
          dataloaded:false,
          day:'',
          month:'',
          year:'',
          

      };
  }



  data = [
    {
      gala : 'Gala',
       key:1,
   
       nightparty : 'Night Party',
       key:2,

       opera : 'Opera',
       key:3,
       
       urbanmusic : 'Urban Music',
       key:4,

       bbq: 'BBQ',
       key:5,

       other : 'Other',
       key:6,
       
   }

    ];







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
                      nextStep:true
  
                      
                  }).then(image => {
                    this.setState({
                      imageSelected: true,
                      imageId: this.uniqueId(),
                      imageURI: image.path,
                      nextStep:true
                      
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
  const uploadTask =  storage().ref('Store/img').child(FilePath).put(blob);
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

    var Title = this.state.title;
    var Categoty = this.state.category;
    var author = auth().currentUser.uid;
    var Location = this.state.location;
    var imageID = this.state.imageID;
    var authorprofilepicture = auth().currentUser.photoURL;
    var authorname = auth().currentUser.displayName;
    var website = this.state.website;
    const userID = auth().currentUser.uid;
    const date = new Date().getTime();

  var storeDATA = {
        title : Title,
        category: Categoty,
        location: Location,
        image : imageUrl,
        date : date,
        author:author,
        authorprofilepicture :authorprofilepicture,
        authorname: authorname,
        website: 'https://'+website,
        eventdate:this.state.day +'/'+this.state.month +'/'+this.state.year,


  }

  firestore().collection('EVENT').add(storeDATA);

  database().ref(`/users/${userID}/event/${imageID}`)
  .set(storeDATA);


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
        const {title,location, website,day, month, year} = this.state;


        if(title!='' && location!='' && day!='' && month!='' && year!='')
        {

          this.setState({
            dataloaded:true,
          })

          this.UploadPublish();

        }


       }}
    ],
    { cancelable: false }
  );

    // this.UploadPublish();
     

   
}

























render(){ 
  console.log('AddPostForm');
  return (
    <View>
{ this.state.finishStep === false ? (    
<View style={{ marginLeft:10, marginRight:10}}>
      <View style={{
       // alignSelf:'center',
        marginTop:10,
      }}>

        <TouchableOpacity 
      
        style={{
          padding:10,
          opacity:0.8

          
        }}
        onPress={this.findNewImage}>
        <Image
        thumbnailSource={{uri:this.state.imageURI}}
        source={{uri:this.state.imageURI}}
        style={{
          width:300,
          height:300,
          alignSelf:'center',
          justifyContent:'center',
          borderWidth:1,
          borderColor:'#05c7fc',

        }}
        
        />
        </TouchableOpacity>
 

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
          <TouchableOpacity onPress={()=> this.setState({ category: item.gala})}>
          <View style={styles.categoryContainer1}>
             <Text style={styles.categoryText1}>{item.gala}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.setState({ category: item.nightparty})}>
          <View style={styles.categoryContainer2}>
             <Text style={styles.categoryText2}>{item.nightparty}</Text>
          </View>
          </TouchableOpacity>
                    <TouchableOpacity onPress={()=> this.setState({ category: item.opera})}>
          <View style={styles.categoryContainer7}>
             <Text style={styles.categoryText7}>{item.opera}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.setState({ category: item.urbanmusic})}>
          <View style={styles.categoryContainer3}>
             <Text style={styles.categoryText3}>{item.urbanmusic}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.setState({ category: item.bbq})}>
          <View style={styles.categoryContainer4}>
             <Text style={styles.categoryText4}>{item.bbq}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.setState({ category: item.other})}>
          <View style={styles.categoryContainer5}>
             <Text style={styles.categoryText5}>{item.other}</Text>
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




{ this.state.nextStep === true ? (
      <View style={{
        marginTop:10,
      }}>
        <Button
        onPress={()=> this.setState({ finishStep:true})}
        label="Next Step"
        />
      </View>):<View></View>}

      


    </View>):

    <View 
    style={{
      marginLeft:10,
      marginRight:10,
      marginTop:10,
    }}>
    
    <View style={{ 
       flex:1, 
        marginBottom:50,
        }}>
        <InputDataEdit
        placeholder="Title"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={20}
        value={this.state.title}
        onChangeText={(text) => this.setState({
           title:text,
        })} 
        />
      </View>




      <View style={{ 
      //  flex:1, 
      marginBottom:10,
      padding:10
    

        }}>
          <Text style={{ fontWeight:'bold'}}>{this.state.category}</Text>
      </View>

      <View style={{ 
      //  flex:1, 
      marginBottom:50,

        }}>
        <InputDataEdit
        placeholder="Location"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={20}
        value={this.state.location}
        onChangeText={(text) => this.setState({
           location:text,
        })} 
        />
      </View>

      <View style={{ 
      //  flex:1, 
        marginBottom:50,
        
        }}>
        <InputForPosts
        placeholder="www.mywebsite.com"
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={20}
        value={this.state.website}
        onChangeText={(text) => this.setState({
           website:text,
        })} 
        />
      </View>
      <View style={{ 
      //  flex:1, 
        marginBottom:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignSelf:'center',
        alignItems:'center',
        marginTop:10,
        marginLeft:'20%',
        }}>
          <TextInput
          keyboardType="numeric"
          style={{
            flex:1,
            //marginLeft:20,
          }}
          value={this.state.day}
          onChangeText={(text) => this.setState({
             day:text,
          })} 
          maxLength={2}
          placeholder="DD"
          />
          <TextInput
          keyboardType="numeric"
          value={this.state.month}
          onChangeText={(text) => this.setState({
             month:text,
          })} 
          style={{
            flex:1,
           // marginLeft:20,
          }}
          maxLength={2}
          placeholder="MM"
          />
          <TextInput
          value={this.state.year}
          onChangeText={(text) => this.setState({
            year:text,
          })} 
          keyboardType="numeric"
          style={{
            flex:1,
            //marginLeft:20,
          }}
          maxLength={4}
          placeholder="YY"
          />
      </View>
{ this.state.dataloaded === false?
    ( <View 
      style={{
        marginTop:20,
        marginBottom:20,
      }}>
        <Button
        onPress={this.onButtonPress.bind(this)}
        label="Post"
        />
      </View>):
      <View
      style={{
        marginTop:80,
      }}
      >
        <Spinner/>
      </View>}


        
    </View>}


    </View>

 
  );
}
}



export  default AddEventsForm;


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