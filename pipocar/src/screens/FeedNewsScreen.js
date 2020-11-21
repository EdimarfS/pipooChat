  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  FlatList,
  TouchableOpacity
} from "react-native";
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import ImageBlurLoading from 'react-native-image-blur-loading';
import * as tf from '@tensorflow/tfjs';
import * as mobilrnet from '@tensorflow-models/mobilenet';



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
     style={{
       borderWidth:1,
       padding:10,
       borderColor:'#05c7fc'
     }}>
       <Text>Add post</Text>
     </TouchableOpacity>
   </View>
  )
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
              // flex:1,
               justifyContent:'center',
               marginTop:2,
               marginBottom:0,
               padding:10,
             }}>
 
               <View>
              <TouchableOpacity
              onLongPress={() => { console.log(item.userName,item.caption) }}
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
                 marginBottom:'14%',
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

               </View>


  
            
             </View>

               )






        }}/>

    </View>

 
  );
}
}



export  {FeedNewsScreen};
