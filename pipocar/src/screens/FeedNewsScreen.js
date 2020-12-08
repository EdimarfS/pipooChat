  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  FlatList,
  TouchableOpacity,
  Alert,
  Image
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
    super(props)

    this.viewShot = React.createRef(null);
    this.state={ 
      query:"",
      data:[],
      fullData:[],
      found:false,
      refreshing:true,
      loaded:false,
      comment:'',
      photoId:'',
      screenshot:null,
      dataloaded:false,
      saved:false,
      
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

onCapture = (uri) => {
  console.log("do something with ", uri);
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
                     }}>{item.userName.substring(0,14)+'...'}</Text>
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


               <View style={{  alignSelf:'center'}}>
               <ImageModal
                resizeMode="contain"
              
                imageBackgroundColor="lightgrey"
                style={{
                  width:400,
                  height:400,
                 // alignSelf:'center'
                }}

                source={{ uri: item.url}}
              />
                 




               </View>
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
                    <TouchableOpacity>
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
                                  console.log('Document Successfully deleted');
                                  this.setState({
                                    saved:false,
                                  })
                                })
                                .catch(()=>{
                                  console.log('Something went wrong, could not be deleted');
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
    </View>

 
  );
}
}



export  {FeedNewsScreen};
