  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { 
    Input,
    InputForPosts,
    InputDataEdit

} from '../reusebleComponents/index'
import ImageBlurLoading from 'react-native-image-blur-loading';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import style from "react-native-image-blur-loading/src/style";
import { Actions } from 'react-native-router-flux';
import storage from '@react-native-firebase/storage';
/* 

<InputDataEdit
placeholder="Heyyy"
value={this.state.userBio}
onChangeText={text => this.setState({ userBio:text})}

/>

 */








class  UserPersonalEditDataForm extends Component {



    constructor(props)
    {
      super(props)
  
      this.modalizeAccountRef = React.createRef();
  
      this.modalizeFavoritetRef = React.createRef();
      this.state = {
        imageID: this.uniqueId(),
        userName:'',
        userID:'',
        userLocation:'',
        userBio:'',
        loaded: false,
        imageURL:'https://firebasestorage.googleapis.com/v0/b/pipocar-61cd8.appspot.com/o/groupCovers%2Fcrowd.png?alt=media&token=0f2ecb98-b3d7-40b6-af96-5e6eaeed6370',
        data:[],
        imageSelected:false
      }
  
  
    }

    UNSAFE_componentWillMount()
    {
        this.userAllInfo();
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







//ImagePicker

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





//S4s
s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };


uniqueId = () => {
    return (
      this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4()
    );
  };





  processUpload = (imageUrl) => {

    var userID = auth().currentUser.uid;
    var userName = auth().currentUser.displayName;
    var imageID = this.state.imageID;
    var caption = this.state.caption;
    var dateTime = Date.now();
    var timestamp = Math.floor(dateTime / 1000);

    var userObject = {

        userName:this.state.userName,
        userID:this.state.userID,
        userLocation:this.state.userLocation,
        userBio:this.state.userBio,
        profilepicture:imageUrl,

    }

    //set user photos object
    database().ref(`/users/${userID}`)
    .set(userObject);
    
    auth().currentUser.updateProfile({
        photoURL:imageUrl
    })
                                          
                        
  
    this.setState({
        uploading: false,
        imageURI:'https://firebasestorage.googleapis.com/v0/b/pipocar-61cd8.appspot.com/o/groupCovers%2Fcef4c151ecd7c2fd46180b45fb5bc1a1.jpg?alt=media&token=8beea4de-e1fd-439d-8162-eb7bab61e41c'

      }) 

      
      
  
  
  //Actions Here
  Actions.pop();
  Actions.refresh({});
  }


userAllInfo = () => {
        //fecthing the data first
            const { currentUser } = auth();
            database().ref(`/users/${currentUser.uid}`)
            .on('value', snapshot => {
               console.log('SANPSHOT', snapshot)
      
                console.log("USER DATA FETCH From User Reducer!!!!!!!!!!!!!!!!!!!!!!");
                const data = snapshot.val();
                this.setState({
                    userName: data.userName,
                    userID: data.userID,
                    userLocation: data.userLocation,
                    userBio: data.userBio,
                    loaded: true,
      
                })
                     
                }) 
      
                
      }


    
onButtonPress()
    { 
        console.log('UPLOAD PUBLISH!!!')
         this.UploadPublish();  
    
    }
UploadPublish = () => {

        this.uploadImage(this.state.imageURI);
  }
  










userAllInfo = () => {
        //fecthing the data first
      
            const { currentUser } = auth();
            database().ref(`/users/${currentUser.uid}`)
            .on('value', snapshot => {
               console.log('SANPSHOT', snapshot)
      
                console.log("USER DATA FETCH From User Reducer!!!!!!!!!!!!!!!!!!!!!!");
                const data = snapshot.val();
                this.setState({
                    userName: data.userName,
                    userID: data.userID,
                    userLocation: data.userLocation,
                    userBio: data.userBio,
                    loaded: true,
                  
      
                })
                     
                }) 
      
                
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
      
onDeleteAccount(){
    var user = auth().currentUser;

    console.log("DELETED ACCOUNT!!")
/*     user.delete().then(function() {
    // User deleted.
        
    }, function(error) {
    // An error happened.
    }); */
}


render(){ 
  console.log('UserPersonEditScreen');
  return (  
    <SafeAreaView style={{ 
        //alignSelf:'center'
        backgroundColor:'#f5f5f5',
      // flex:1,
        }}>
            
        
        <View style={{ marginLeft:10, marginRight:10,}}>
        <View>
            <TouchableOpacity 
            onPress={this.findNewImage}
            style={{
                marginTop:'10%',
                borderWidth:1,
                borderColor:'#05c7fc',
                padding:10,
                alignSelf:'center',
                backgroundColor:'white',
               
                marginBottom:10,
                borderRadius:90,

            }}>
{ this.state.imageSelected === false ? 
                <ImageBlurLoading
                thumbnailSource={{ uri: auth().currentUser.photoURL }}
                source={{ uri: auth().currentUser.photoURL }}
                style={{
                    width:100,
                    height:100,
                    borderRadius:50,
                }}
                />  : 
                <ImageBlurLoading
                thumbnailSource={{ uri: this.state.imageURI}}
                source={{ uri: this.state.imageURI }}
                style={{
                    width:100,
                    height:100,
                    borderRadius:50,
                }}
                /> 
                
                
                }

            </TouchableOpacity>
        </View>
        <View style={styles.MarginBettwenFields}>
            <Input
            placeholder="userName"
            value={this.state.userName}
            onChangeText={text => this.setState({ userName:text})}
            autoCorrect={false}
            autoCapitalize="none"


            
            />
        </View>
        <View style={styles.MarginBettwenFields}>
            <Input
            placeholder="userID"
            value={this.state.userID}
            onChangeText={text => this.setState({ userID:text})}
            autoCorrect={false}
            autoCapitalize="none"
            
            />
        </View>
        <View style={styles.MarginBettwenFields}>
            <Input
            placeholder="userBio"
            value={this.state.userBio}
            onChangeText={text => this.setState({ userBio:text})}
            autoCorrect={false}
            autoCapitalize="none"
            
            
            />
        </View>

        <View>
        <TouchableOpacity  
        onPress={this.onButtonPress.bind(this)}
        >
                      <View  
                          
                      style={{
                      //  marginBottom:30,
                        justifyContent:'center',
                        alignSelf:'center',
                        backgroundColor:'#44e300',
                        width:'100%',
                        height:60,
                        borderRadius:5,
                        marginTop:10,
                      }}>  
                      <Text 
                      style={{
                      fontSize:20,
                      textAlign:'center',
                      color:'white',
                      fontWeight:'bold'
                
                      }}> Finish </Text>
                
                
                      </View>
            </TouchableOpacity>
        <TouchableOpacity  
        onPress={this.onDeleteAccount.bind(this)}
        >
                      <View  
                          
                      style={{
                      //  marginBottom:30,
                        justifyContent:'center',
                        alignSelf:'center',
                        backgroundColor:'red',
                        width:'100%',
                        height:60,
                        borderRadius:5,
                        marginTop:10,
                      }}>  
                      <Text 
                      style={{
                      fontSize:20,
                      textAlign:'center',
                      color:'white',
                      fontWeight:'bold'
                
                      }}> Delete my account </Text>
                
                
                      </View>
            </TouchableOpacity>
        </View>


    </View>
    </SafeAreaView>
 
  );
}
}



export default UserPersonalEditDataForm;


const styles = {

    MarginBettwenFields : {
        marginBottom:'20%',
    }
}