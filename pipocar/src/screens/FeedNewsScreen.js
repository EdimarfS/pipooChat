  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  FlatList
} from "react-native";
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
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




render(){ 
  console.log('FeedNewsScreen');
  return (
    <View>
      <Text>hELLO</Text>

      <FlatList
        data={this.state.data}
        refreshing={this.state.refreshing} 
        onRefresh={this.onRefresh}
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false}
       // ListEmptyComponent={this._listEmptyComponent}
        keyExtractor={ item => item._id.toString()}
       // numColumns={3}
     //   horizontal ={true}

        renderItem={({item}) => {
          return (
            <View style={{
               flex:1,
               justifyContent:'center',
               marginTop:2,
               marginBottom:0,
               padding:10,
             }}>


            <Text>{item.userName}</Text>
             </View>

               )






        }}/>

    </View>

 
  );
}
}



export  {FeedNewsScreen};
