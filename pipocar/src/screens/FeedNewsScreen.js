  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  TextInput,
  Animated
} from "react-native";
import { Actions } from 'react-native-router-flux';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import ImageBlurLoading from 'react-native-image-blur-loading';
import * as tf from '@tensorflow/tfjs';
import * as mobilrnet from '@tensorflow-models/mobilenet';
import auth from '@react-native-firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Share from 'react-native-share';
import ImageModal from 'react-native-image-modal';
import {Spinner} from '../components/reusebleComponents/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Modalize } from 'react-native-modalize';


/*
                      firestore().collection('STORE')
                      .doc(item._id)
                      .delete()
                      .then(()=>{
                        console.log('Document Successfully deleted');
                      })
                      .catch(()=>{
                        console.log('Something went wrong, could not be deleted');
                      })

*/



class  FeedNewsScreen extends Component {

  //Constructor 
  constructor(props)
  {
    super(props);

    this.modalizeRef = React.createRef();
    this.animated =  React.createRef(new Animated.Value(0)).current;

    
    this.state={ 
      query:"",
      data:[],
      fullData:[],
      found:false,
      refreshing:true,
      loaded:false,
      userComment:'',
      userProfilePicture:'',
      commentDocID:'',
      commentPhotoURL:'',
      userName:'',
      author:'',
      photoId:'',
      screenshot:null,
      dataloaded:false,
      saved:false,
      commentsTransaction:false
      
      
      
    }


  }

UNSAFE_componentWillMount()
{
  this.fetchPost();
  
}

fetchPost = () => {

  firestore()
  .collection('POST')
  .orderBy('posted', 'desc')
  .onSnapshot(querySnapshot => {
      
      var  thread  = querySnapshot.docs.map(doc => {

          return {
              _id : doc.id,
              ...doc.data()
          }
      })

      this.setState({
        data:thread,
        refreshing:false,
        loaded:true,
        dataloaded:true
      })
  }, this.onError)

}

onError = (error) => {
  console.error("Error in Upload", error);
}


//Open Modal
onOpen(item)
{
    this.modalizeRef.current?.open();

/*     userComment:'',
    userProfilePicture:'',
    userName:'', */

    this.setState({
      userProfilePicture: auth().currentUser.photoURL,
      userName:auth().currentUser.displayName,
      commentDocID:item._id,
      commentPhotoURL:item.url,
      author:item.author,
    })

    console.log('ITEMSSSS', item);
}
//Close Modal
onClose()
{
    this.modalizeRef.current?.close();
}


renderHeader()
{
  return(
    <View style={{
      alignSelf:'center',
      marginTop:10,
      marginBottom:20,
      
    }}>
     <TouchableOpacity 
     onPress={()=>{ Actions.addpost()}}
     style={{
       borderWidth:1,
       padding:10,
       borderColor:'#05c7fc',
       flexDirection:'row',
    
     }}>
       <AntDesign 
       name="picture" size={20} color="grey" />
       <AntDesign 
      style={{ marginLeft:10}}
       name="videocamera" size={20} color="grey" />
       <AntDesign
       style={{ marginLeft:10}} 
       name="smileo" size={20} color="grey" />
     </TouchableOpacity>

   </View>
  )
}
onRefresh = () => {
  this.fetchPost();
}



//Share

shareCONTENT = () => {



}

onCommentPress = () => {


  const { userComment, userProfilePicture, commentDocID, userName, author } = this.state;
  if(userComment!='')
  {
    var commentObj = { 
      userComment: userComment,
      userProfilePicture: userProfilePicture,
      doc: commentDocID,
      userName: userName,
      author: author,
      posted: new Date().getTime(),
    }

    //Comments
    firestore()
    .collection('COMMENTS')
    .doc(commentDocID)
    .collection('all')
    .add(commentObj);
    this.onClose();
  }

    

}


renderEmpty = () => {
  
  return(
    <View style={{
      width:'100%',
      height:350,
      backgroundColor:'#f5f5f5',
      justifyContent:'center',
 
    }}>
      <EvilIcons 
      style={{
        alignSelf:'center'
      }}
      name="image" size={100} color="lightgrey" />
      <Text
      style={{
        alignSelf:'center',
        color:'grey',
        fontWeight:'bold'
      }}
      >No post yet, be the first one posting</Text>
    </View>
  )
}


render(){ 
  console.log('FeedNewsScreen');
  return (

    <View>
{ this.state.dataloaded === true ? (    <View>
      <FlatList
        data={this.state.data}
        refreshing={this.state.refreshing} 
        onRefresh={this.onRefresh}
        ListHeaderComponent={this.renderHeader}
        ListEmptyComponent={this.renderEmpty}
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false}
       // ListEmptyComponent={this._listEmptyComponent}
        keyExtractor={ item => item._id.toString()}
       // numColumns={3}
     //   horizontal ={true}

        renderItem={({item}) => {
          return (


            <View style={{
               justifyContent:'center',
               marginTop:1,
               marginBottom:0,
               padding:10,
             }}>

              <TouchableOpacity

onPress={()=>{
  if(item.author === auth().currentUser.uid){
    Alert.alert(
      item.userName,
      `Do you want to delete ${item.caption}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          firestore().collection('POST')
          .doc(item._id)
          .delete()
          .then(()=>{
            console.log('Document Successfully Deleted');
          })
          .catch(()=>{
            console.log('Something went wrong, could not be Deleted');
          })

          //RealTime Database

        } }
      ],
      { cancelable: false }
    );} }}
                style={{ 
                alignItems:'flex-end',
                justifyContent:'flex-end',
                marginBottom:10

                }}>
              <Text 
                style={{ 
                fontSize:30, 
                fontWeight:'bold',
                color:'grey',
              }}
                >...</Text>
             </TouchableOpacity>



             <View style={{
                 top:5,
                 marginBottom:'6%',
                 flexDirection:'row',
                // marginTop:5,
                // backgroundColor:'red',           

               }}>
                 <ImageBlurLoading
                 style={{
                   width:40,
                   height:40,
                   borderRadius:50, 
   
                 }}
                 thumbnailSource={{ uri: item.profilepicture}}
                 source={{ uri: item.profilepicture}}
                 />

                 <View style={{
                   marginLeft:'10%',
                   marginRight:'10%'
                 }}>
                    <View>
                     <Text style={{
                       fontWeight:'bold'
                     }}>{item.userName.substring(0,17)}</Text>
                    </View>
                    <View style={{ 
                      marginTop:5,
                     // alignSelf:'center'
                      }}>
                     <Text style={{
                       color:'grey'
                     }}>{item.caption}</Text>
                    </View>


                 </View>

                  
                </View>




                

               <View>


               <TouchableOpacity 
               onPress={()=>{ 

                Actions.comments({ postDetails: item })
/* 
                this.setState({
                  commentsTransaction: true,
                })
                if(this.state.commentsTransaction)
                {
                  this.setState({
                    commentsTransaction: false,
                  })

                } */

              
              }}
               style={{  alignSelf:'center'}}>
               <Image              
                style={{
                  width:400,
                  height:400,
                 // alignSelf:'center'
                }}

                source={{ uri: item.url}}
              />
                 




               </TouchableOpacity>
                <View 
                style={{
                  marginTop:20,
                  flexDirection:'row',
                  justifyContent:'space-between',
                  borderWidth:1,
                  padding:10,
                  borderRadius:10,
                  borderColor:'#e0e0e0'

                }}>
                    <TouchableOpacity 
                    onPress={()=>{
                      const shareOptions = {
                        title:'Share Post',
                        message:item.caption,
                        url: item.url,
                        subject:'Hey',
                      }

                      try { 
                        
                        const ShareResponse =  Share.open(shareOptions)
                        .then((res) => { console.log(res) })
                        .catch((err) => { err && console.log(err); });
                        
                      

                      }catch(error){ 

                        console.log(error)


                      }
                    }}
                    >
                    <EvilIcons name="link" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=> { 
                      this.onOpen(item);
                    }}
                    >
                    <Text style={{ fontWeight:'bold', color:'grey'}}>comments</Text>
                    </TouchableOpacity>
{ this.state.saved === false ? (                    
                    <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        saved:true,
                      })
                      const author = auth().currentUser.uid;
                      const username = item.userName;
                      const caption  = item.caption;
                      const url = item.url;
                      const posted = new Date().getTime();
                      
                                const userReportData = {
                                  
                                  userName : username,
                                  caption: caption,
                                  image: url,
                                  posted:posted,
                                  author:author,
            
                                }
                                 firestore()
                                .collection('SAVE_POST')
                                //.doc(item._id)
                                .add(userReportData)
                                .then(()=>{
                                  console.log('Document Successfully saved');
                                  this.setState({
                                    saved:false,
                                  })
                                })
                                .catch(()=>{
                                  console.log('Something went wrong, could not be saved');
                                })

                                //RealTime Database
/*                                 database().ref(`/users/${author}/save/${item._id}`)
                                .set(userReportData); */

            
                              } }
                 
            
                    
                    >
                    <Fontisto  name="favorite" size={22} />
                    </TouchableOpacity>) : 
                    <View>
                      <AntDesign name="checkcircle" size={24} color="#00cf37" />
                    </View>}


                </View>

               </View>
       
  
            
             </View>

               )






        }}/>

    </View>) : 
    
    <View
    style={{
      marginTop:'50%'
    
    }}>
      <Spinner/>
    </View>}


    <Modalize
    style={{
        flex:1,
    }}
    modalStyle={{
    // backgroundColor:'trasparent'
    }}
    panGestureAnimatedValue={this.refs.animated}
    scrollViewProps={{ showsVerticalScrollIndicator: false }}
    withHandle={true}
    ref={this.modalizeRef}
    animationType="slide"
    visible={false}

    modalHeight={500}
    snapPoint={500}
            
    > 
    <View
    style={{
      flex:1,

    }}
    >
      <View
      style={{
        alignSelf:'center',

      }}
      >
        <Image
        source={{
          uri:this.state.commentPhotoURL,
        }}
        style={{
          width:30,
          height:30,
        }}
        />
      </View>
      <View 
      style={{
        marginTop:10,
        marginLeft:10,
        marginRight:10,

      }}>
      <TextInput
      placeholder="write an comment"
      value={this.userComment}
      onChangeText={text => { this.setState({
        userComment:text,
      })}}
      multiline
      style={{
        backgroundColor:'lightgrey',
        width:'100%',
        height:100,

      }}
      
      />
      </View>
      <View
      style={{
        marginLeft:10,
        marginRight:10,
      }}
      >
      <TouchableOpacity
      onPress={this.onCommentPress.bind(this)}
      style={{
        justifyContent:'center',
        alignSelf:'center',
        marginTop:10,
        backgroundColor:'#05c7fc',
        width:'100%',
        height:60,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
      }}
      >
        <Text
        style={{
          fontWeight:'bold',
          color:'white',
          fontSize:20
        }}
        >Comment</Text>
      </TouchableOpacity>
      </View>



    </View>


            
      </Modalize>


    </View>

 
  );
}
}



export  {FeedNewsScreen};
