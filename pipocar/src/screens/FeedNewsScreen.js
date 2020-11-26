  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  FlatList,
  TouchableOpacity,
  Alert
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

    this.state={ 
      query:"",
      data:[],
      fullData:[],
      found:false,
      refreshing:true,
      loaded:false,
      comment:'',
      photoId:'',
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


render(){ 
  console.log('FeedNewsScreen');
  return (
    <View>
      <FlatList
        data={this.state.data}
        refreshing={this.state.refreshing} 
        onRefresh={this.onRefresh}
        ListHeaderComponent={this.renderHeader}
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
 
               <View>
              <TouchableOpacity
              //onLongPress={() => { console.log(item.userName,item.caption) }}
              onLongPress={()=>{
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
                      } }
                    ],
                    { cancelable: false }
                  );} else{
                    Alert.alert(
                      'Save',
                      `Do you want to save this post ?`,
                      [
                        {
                          text: "Cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        { text: "OK", onPress: () => {
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
                          })
                          .catch(()=>{
                            console.log('Something went wrong, could not be deleted');
                          })

                        } }
                      ],
                      { cancelable: false }
                    );

                  }
              }}


              >
               <View>
                 <ImageBlurLoading
                 style={{
                   width:'100%',
                   height:330,
              
                 }}
                 thumbnailSource={{ uri: item.url}}
                 source={{ uri: item.url}}
                 />
               </View>
               </TouchableOpacity>
               <View style={{
                 top:10,
                 marginBottom:'3%',
                 flexDirection:'row'
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
                 }}>
                    <View>
                     <Text style={{
                       fontWeight:'bold'
                     }}>{item.userName}</Text>
                    </View>
                    <View style={{ marginTop:5}}>
                     <Text>{item.caption}</Text>
                    </View>


                 </View>

                  
                </View>
                

                <View 
                style={{
                  marginTop:20,
                  flexDirection:'row',
                  justifyContent:'space-between',
                  borderWidth:1,
                  padding:10,
                  borderRadius:10,
                  borderColor:'#cfcfcf'

                }}>
                    <TouchableOpacity>
                    <EvilIcons name="link" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <Text>comments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <EvilIcons name="heart" size={30} color="black" />
                    </TouchableOpacity>


                </View>

               </View>


  
            
             </View>

               )






        }}/>

    </View>

 
  );
}
}



export  {FeedNewsScreen};
