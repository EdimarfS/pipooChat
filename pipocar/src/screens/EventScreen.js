  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Alert
} from "react-native";
import  { 
  SearchBar
} from '../components/reusebleComponents/index';
import firestore from '@react-native-firebase/firestore';
import { Modalize } from 'react-native-modalize';
import { Actions } from 'react-native-router-flux';
import auth from '@react-native-firebase/auth';
import _ from 'lodash';
import ImageModal from 'react-native-image-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Spinner } from '../components/reusebleComponents/index'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
//Fontisto

/*


*/

class  EventScreen extends Component {

  constructor(props)
  {
    super(props)
    this.modalizeRef = React.createRef();
    this.state={ 
      query:"",
      data:[],
      fullData:[],
      found:false,
      refreshing:false,
      searchBarText:'',
      //This is the state for modalize 
      category:'',
      title:'',       
      dataloaded:false

    }
  }


//This will run each time the App is called
UNSAFE_componentWillMount()
{ 
    //we are calling here the funtion to get all the groups
    this.fetchSTORE();

}


//
onOPEN()
    {
        this.modalizeRef.current?.open();
    }
onCLOSE()
    {
        this.modalizeRef.current?.close();
    }



//Handle Search 
handleSearch = (text) => {
  const formatQuery = text.toLowerCase();
  const data = _.filter(this.state.fullData, user => {
 
          if(user.category.toLowerCase().includes(formatQuery) 
          || user.title.toLowerCase().includes(formatQuery)  
          || user.authorname.toLowerCase().includes(formatQuery)
          || user.location.toLowerCase().includes(formatQuery)

          
          )
         {
           this.setState({
             found:true,
           })
           return true;
         }
         this.setState({
           found:false,
         })
         return false;
          // return this.contains(user, formatQuery) 
       }) 
 
     console.log('FORMAT QUERY', text);
     console.log('DATA!!!', data);
 
 
        this.setState({
           data : data, 
           query:formatQuery,
           found:true,
         }) 
 
     
 
 }



 onDELETE = () => {







 }













  tags = [
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
    
    
    ]



//Fecthing Groups
fetchSTORE = () => {

  firestore()
  .collection('EVENT')
  .orderBy('date', 'desc')
  .onSnapshot(querySnapshot => {
      
      var  thread  = querySnapshot.docs.map(doc => {

          return {
              _id : doc.id,
              ...doc.data()
          }
      })

      this.setState({
        data:thread,
        fullData:thread,
        refreshing:false,
        loaded:true,
        dataloaded:true
      })
  }, this.onError)

}




renderHeader = () => {
  return(
    <View>
        <View style={{ 
          flex:1,
         // alignSelf:'center'
         marginLeft:10,
         flexDirection:'row',
         backgroundColor:'white'
         
          
          }}>
       <Text 
        style={{
          fontSize:50,
        //  fontWeight:'bold',
          marginBottom:6,
         // color:'grey'
         // backgroundColor:'red'
        }}>
          Events
        </Text>
        </View>
    <View style={{ 
      flex:1,
      marginLeft:5,
      marginRight:5,
      marginTop:10,
      marginBottom:20
      
   //   justifyContent:'center',
    //  alignContent:'center',
      }}>
      <SearchBar
      placeholder="search a group or business...."
      onChangeText={this.handleSearch}
      />
    </View>


    <FlatList
    data={this.tags}
    showsVerticalScrollIndicator ={false}
    refreshing={this.state.refreshing} 
    onRefresh={this.onRefresh}
    showsHorizontalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    keyExtractor={ item => item.key.toString()}
    //numColumns={3}
    horizontal 
    renderItem={({item}) => {

      return(
        <View style={{ 
          flexDirection:'row', 
         // marginTop:5,
          marginBottom:20,
          backgroundColor:'white'
          //backgroundColor:'red',
          }}>
          <TouchableOpacity onPress={()=> this.handleSearch(item.gala)}>
          <View style={styles.categoryContainer1}>
             <Text style={styles.categoryText1}>{item.gala}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.handleSearch(item.nightparty)}>
          <View style={styles.categoryContainer2}>
             <Text style={styles.categoryText2}>{item.nightparty}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.handleSearch(item.opera)}>
          <View style={styles.categoryContainer3}>
             <Text style={styles.categoryText3}>{item.opera}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.handleSearch(item.urbanmusic)}>
          <View style={styles.categoryContainer4}>
             <Text style={styles.categoryText4}>{item.urbanmusic}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.handleSearch(item.bbq)}>
          <View style={styles.categoryContainer5}>
             <Text style={styles.categoryText5}>{item.bbq}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.handleSearch(item.other)}>
          <View style={styles.categoryContainer7}>
             <Text style={styles.categoryText7}>{item.other}</Text>
          </View>
          </TouchableOpacity>

          
          
        </View>

      )

    }}
    
    
    />
          <Text
      style={{
        color:'grey',
        marginTop:5,
        marginBottom:15,
        marginLeft:10,
        marginRight:10,
        fontSize:10,
        textAlign:'center'
      }}
      >Look for some intersting events around your city and the world, if you want to know more click to check the website</Text>
      <View style={{
      alignSelf:'center',
      marginBottom:20,
      
     // marginTop:10
    }}>
     <TouchableOpacity 
     onPress={()=>{ Actions.products()}}
     style={{
       borderWidth:1,
       padding:10,
       borderColor:'#05c7fc',

       
     }}>
       <Text style={{
         fontWeight:'bold',
       }}>Create Event</Text>
     </TouchableOpacity>
   </View>
    </View>
    
  )
      
}

/* onRefresh=()=>{
  this.fetchStore();
} */

onRefresh = () => {
  this.fetchSTORE();
}

renderEmpty = () => {
  
  return(
    <View style={{
      width:'100%',
      height:266,
      backgroundColor:'#f5f5f5',
      justifyContent:'center',
 
    }}>
      <View
      
      style={{
        flexDirection:'row',
        justifyContent:'center'
      }}
      >
    <MaterialCommunityIcons 
    style={{ marginLeft:10}}
    name="food-fork-drink" size={40} color="lightgrey" />
    
    <MaterialCommunityIcons 
    style={{ marginLeft:10}}
    name="music-note-eighth" size={40} color="lightgrey" /> 




    </View>

      <Text
      style={{
        alignSelf:'center',
        color:'grey',
        marginTop:10,
        fontWeight:'bold'
      }}
      > Look for some good events...</Text>
    </View>
  )
}

render(){ 
  console.log('StoreScreen');
  return (
        <View 
        style={{
          flex:1,
        }}>
{ this.state.dataloaded ? (
        <View style={{ 
          flex:1, 
         // backgroundColor:'#fafafa',
          backgroundColor:'white'
          
          }}>
           <FlatList
        data={this.state.data}
        refreshing={this.state.refreshing} 
        onRefresh={this.onRefresh}
        ListHeaderComponent={this.renderHeader}
        ListEmptyComponent={this.renderEmpty}
        showsVerticalScrollIndicator ={false}
        numColumns={1}
        showsHorizontalScrollIndicator={false}
       // ListEmptyComponent={this._listEmptyComponent}
        keyExtractor={ item => item._id.toString()}
       // numColumns={3}
     //   horizontal ={true}

        renderItem={({item}) => {

          console.log('ITEM!!!!!!!!', item);
          return(
           <View style={{
                flex:1, 
                backgroundColor:'white',
                alignSelf:'center',
                justifyContent:'center',
               // borderRadius:5,
                //marginTop:20,
                //borderWidth:0.3,
                marginLeft:10,
                marginRight:10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.18,
                shadowRadius: 1.00,

                elevation: 1,
               // padding:10,
                //borderColor:'#05c7fc',
              //  height:140,
                marginBottom:20,
                //padding:10,
                backgroundColor:'#fafafa'
  
                }}>




              <View style={{
                flexDirection:'row',
              //  alignSelf:'center',
               justifyContent:'space-between',
               alignItems:'flex-end',
               justifyContent:'flex-end',
               marginTop:10,

                //marginTop:20,
              }}>

                <View>
                <TouchableOpacity
                                onPress={()=>{
                                  if(item.author === auth().currentUser.uid){
                                  Alert.alert(
                                    item.title,
                                    `Do you want to delete ${item.title}`,
                                    [
                                      {
                                        text: "Cancel",
                                        onPress: () => console.log("Cancel Pressed"),
                                        style: "cancel"
                                      },
                                      { text: "OK", onPress: () => {
                                        firestore().collection('EVENT')
                                        .doc(item._id)
                                        .delete()
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
                                  else {
                                    console.log('Not your item!!')
                                  }
                  
                  /*                 alert('Do you want to delete')
                                  firestore().collection('STORE')
                                  .doc(item._id)
                                  .delete()
                                  .then(()=>{
                                    console.log('Document Successfully deleted');
                                  })
                                  .catch(()=>{
                                    console.log('Something went wrong, could not be deleted');
                                  }) */
                                }}

                  style={{
                    alignSelf:'flex-end',
                    marginRight:10,

                  }}
                  >
                  <Feather 
                  name="more-horizontal" size={24} color="black" />
                  </TouchableOpacity>
                  </View>
                

                
              </View>
      
              <View 
              
              style={{ 
                flex:1/2, 
                marginTop:10, 
              //  backgroundColor:'red',
                flexDirection:'column'
              }}
              >
              <View 
              style={{ flex:1/2}}
              >
              <View style={{
                  alignSelf:'center'
              }}>
              <Image
                resizeMode="contain"
                style={{
                  width:320,
                  height:250,
                 // borderRadius:1,
                  alignSelf:'center'
                }}

                source={{ uri: item.image}}
              />
              </View>
              </View>


{/*               <View style={{
                  flexDirection:'row',
                  alignSelf:'center',
                  marginTop:10,
                }}>
                <Image
                style={{
                  width:20,
                  height:20,
                  marginRight:10,
                  borderRadius:50,
                  marginLeft:10,
           
                //  alignSelf:'center',
              
                }}
                source={{
                  uri:item.authorprofilepicture
                }}
                
                />
                <Text style={{
                      alignSelf:'center',
                      fontWeight:'bold',
                      color:'grey'
                }}>
                  {item.authorname.substring(0,10)+'...'}
                </Text>
                </View> */}
              



              <View style={{ 
                //alignSelf:'center',
                //marginBottom:3,
               // backgroundColor:'red',
                //marginLeft:20,
                }}>
              <View>
              <Text style={{
              fontWeight:'bold',
              textAlign:'center',
              marginTop:10,
                
                fontSize:15
              }}>{item.title.substring(0,14)+'...'}</Text>
              </View>
              


              <View style={{
                flexDirection:'row',
                alignSelf:'center',
                justifyContent:'center'
              }}>
              <Entypo 
              style={{
                marginTop:7,
              }}
              name="location-pin" size={18} color="grey" />
              <Text style={{
              textAlign:'center',
              marginTop:10,
              color:'grey',
              alignSelf:'center',
              fontSize:15,
             // alignSelf:'center',
              }}>{item.location.substring(0,14)}
              </Text>
              </View>


              
              <View style={{ 
                flexDirection:'row', 
                marginLeft:10,
                marginRight:10,
                justifyContent:'space-between',
                marginBottom:10,
                //alignSelf:'center'
       
               // backgroundColor:'red'
                }}>

              <View style={{ 
                flexDirection:'row', 
                alignSelf:'center',
                justifyContent:'center'
                }}>
              <MaterialIcons name="event" size={24} color="#ff003c" />
              <Text
              style={{
                alignSelf:'center',
                justifyContent:'center',
                marginLeft:5,
                color:'grey'

              }}
              >Event</Text>
              </View>
              <View>
            
              </View>



              

              <TouchableOpacity
              
              onPress={()=> { Linking.openURL(item.website);  }}
              >
                <Text style={{
                fontSize:15,
                color:'#05c7fc',
                fontWeight:'bold',
                marginTop:10,
               // alignSelf:'center'
               // backgroundColor:'red',
      
               // alignSelf:'center'
                }}>read more</Text>
              </TouchableOpacity>



              </View>
              
              </View>















              </View>
              
              
            



              </View>

              
    
          )
        }}
     


         


/>
</View>) :

<View 
style={{
  flex:1
}}
>
<Spinner/>
</View>

}

</View>

);
}}



export  {EventScreen};




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
    color:'grey',


    
  },
  categoryText2:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:'grey',

  },
  categoryText3:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:'grey',
  },
  categoryText4:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:'grey',
  },
  categoryText5:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:'grey',
  },  
  categoryText6:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:'grey',
  },  
  categoryText7:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center',
    color:'grey',
  },
  categoryContainer1:{
   // backgroundColor:'#00d9ff',
    width:100,
    height:30,
   //borderRadius:90,
    justifyContent:'center',
    borderWidth:1,
    borderRadius:90,
    borderColor:'lightgrey',
    marginLeft:5,



  },
  categoryContainer2:{
   // backgroundColor:'#cbffbf',
    width:100,
    height:30,
   // borderRadius:90,
    justifyContent:'center',
    marginLeft:10,
    borderWidth:1,
    borderRadius:90,
    borderColor:'lightgrey',
    marginLeft:5,

  },
  categoryContainer3:{
   // backgroundColor:'#ffc9fc',
    width:100,
    height:30,
   // borderRadius:90,
    justifyContent:'center',
    marginLeft:10,
    borderWidth:1,
    borderRadius:90,
    borderColor:'lightgrey',
    marginLeft:5,

  },
  categoryContainer4:{
   // backgroundColor:'#ffea00',
    width:100,
    height:30,
   // borderRadius:90,
    justifyContent:'center',
    marginLeft:10,
    borderWidth:1,
    borderRadius:90,
    borderColor:'lightgrey',
    marginLeft:5,

  },
  categoryContainer5:{
  //  backgroundColor:'#ff6a00',
    width:100,
    height:30,
  //  borderRadius:90,
    justifyContent:'center',
    marginLeft:10,
    borderWidth:1,
    borderRadius:90,
    borderColor:'lightgrey',
    marginLeft:5,

  },
  categoryContainer6:{
  //  backgroundColor:'#ff005d',
    width:100,
    height:30,
   // borderRadius:90,
    justifyContent:'center',
    marginLeft:10,
    borderWidth:1,
    borderRadius:90,
    borderColor:'lightgrey',
    marginLeft:5,

  },
  categoryContainer7:{
  //  backgroundColor:'#00ddff',
    width:100,
    height:30,
   // borderRadius:90,
    justifyContent:'center',
    marginLeft:10,
    borderWidth:1,
    borderRadius:90,
    borderColor:'lightgrey',
    marginLeft:5,

  },

}