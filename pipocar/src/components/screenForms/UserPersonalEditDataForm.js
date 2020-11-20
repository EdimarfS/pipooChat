  
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
        imageURL: image.path,
        
    })
    }).catch(error => {
      console.log(error)
      this.setState({
      imageSelected: false
    });

  })
}
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


//ImagePic

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
             
        this.processUpload(this.state.imageURL);

}





processUpload = (imageUrl) => {
    const { currentUserName } = auth().currentUser.displayName;
    var userID = auth().currentUser.uid;


    var userObject = {
        userName: this.state.userName,
        userID: this.state.userID,
        userLocation: this.state.userLocation,
        userBio: this.state.userBio,
    }


    //Update database -> This can be accesble in the whole App
    if(auth().currentUser)
    { 
    auth().currentUser.updateProfile({
        photoURL: imageUrl,
    });
    }

/*                 //
    //Group field --> FIRESTORE
    firebase.firestore()
    .collection('POST')
    .where("userName", "==", currentUserName)
    .update({
        profilePictures:imageUrl
    });
*/


    //Update user  object --> From Real Time database USER
    database().ref(`/users/${userID}`)
    .update(userObject);
/* 
    //Updating the user photo --> From Real Time database PHOTO                 
    firebase.database().ref(`/users/photos${userID}`)
    .update(photoObject); */

    this.setState({
        uploading: false,
       // imageSelected: false,
        caption:'',
        uri:'',
    })        
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
    
      
      

//UploadImage
uploadImage = async (uri) => {
    var that = this;
    var userID = auth().currentUser.uid;
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
    

    const uploadTask = storage().ref('profilePictures/'+userID+'/img').child(FilePath).put(blob);
    

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

            }}>
{ this.state.imageSelected === true ?  
                <ImageBlurLoading
                thumbnailSource={{ uri: this.state.imageURL }}
                source={{ uri: this.state.imageURL }}
                style={{
                    width:100,
                    height:100,
                }}
                /> :    
                <ImageBlurLoading
                thumbnailSource={{ uri: auth().currentUser.photoURL}}
                source={{ uri: auth().currentUser.photoURL}}
                style={{
                    width:100,
                    height:100,
            
                }}
                /> }
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