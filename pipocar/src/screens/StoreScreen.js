  
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

/*


*/

class  StoreScreen extends Component {

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
          || user.price.toLowerCase().includes(formatQuery)
          
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
    
    
    ]



//Fecthing Groups
fetchSTORE = () => {

  firestore()
  .collection('STORE')
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
{/*         <Text 
        style={{
          fontSize:50,
          fontWeight:'bold',
          marginBottom:10,
          color:'grey'
         // backgroundColor:'red'
        }}>
          Store
        </Text> */}
        </View>
    <View style={{ 
      flex:1,
      marginLeft:5,
      marginRight:5,
      marginTop:30,
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
          marginTop:20,
          backgroundColor:'white'
          //backgroundColor:'red',
          }}>
          <TouchableOpacity onPress={()=> this.handleSearch(item.vehicles)}>
          <View style={styles.categoryContainer1}>
             <Text style={styles.categoryText1}>{item.vehicles}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.handleSearch(item.properties)}>
          <View style={styles.categoryContainer2}>
             <Text style={styles.categoryText2}>{item.properties}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.handleSearch(item.apperel)}>
          <View style={styles.categoryContainer3}>
             <Text style={styles.categoryText3}>{item.apperel}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.handleSearch(item.classifieds)}>
          <View style={styles.categoryContainer4}>
             <Text style={styles.categoryText4}>{item.classifieds}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.handleSearch(item.electronics)}>
          <View style={styles.categoryContainer5}>
             <Text style={styles.categoryText5}>{item.electronics}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.handleSearch(item.entertaiment)}>
          <View style={styles.categoryContainer7}>
             <Text style={styles.categoryText7}>{item.entertaiment}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.handleSearch(item.family)}>
          <View style={styles.categoryContainer6}>
             <Text style={styles.categoryText6}>{item.family}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.handleSearch(item.freestuffs)}>
          <View style={styles.categoryContainer6}>
             <Text style={styles.categoryText6}>{item.freestuffs}</Text>
          </View>
          </TouchableOpacity>
          
          
        </View>

      )

    }}
    
    
    />
      <View style={{
      alignSelf:'center',
      marginTop:10,
      marginBottom:20,
      marginTop:30
    }}>
     <TouchableOpacity 
     onPress={()=>{ Actions.products()}}
     style={{
       borderWidth:1,
       padding:10,
       borderColor:'#05c7fc',

       
     }}>
       <Text style={{
         fontWeight:'bold'
       }}>New Product</Text>
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
      height:350,
      backgroundColor:'#f5f5f5',
      justifyContent:'center',
 
    }}>
      <EvilIcons 
      style={{
        alignSelf:'center'
      }}
      name="image" size={100} color="grey" />
      <Text
      style={{
        alignSelf:'center',
        color:'black',
        //fontWeight:'bold'
      }}
      >No post yet, be the first one posting</Text>
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
        numColumns={2}
        showsHorizontalScrollIndicator={false}
       // ListEmptyComponent={this._listEmptyComponent}
        keyExtractor={ item => item._id.toString()}
       // numColumns={3}
     //   horizontal ={true}

        renderItem={({item}) => {

          console.log('ITEM!!!!!!!!', item);
          return(
           <View style={{
                flex:1/2, 
                backgroundColor:'#ffffff',
                alignSelf:'center',
                justifyContent:'center',
                borderRadius:10,
                //marginTop:20,
                //borderWidth:0.3,
                marginLeft:10,
                marginRight:10,
               // padding:10,
                //borderColor:'#05c7fc',
              //  height:140,
                marginBottom:10,
                padding:10,
                shadowColor: "#000",
                shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.10,
              shadowRadius: 2.22,
              elevation: 3,


                
                }}>


              <View style={{
                flexDirection:'row',
                alignSelf:'center',
                justifyContent:'center',
                //marginTop:20,
              }}>
                <Image
                style={{
                  width:30,
                  height:30,
                  marginRight:10,
                  borderRadius:50,
                  alignSelf:'center',
              
                }}
                source={{
                  uri:item.authorprofilepicture
                }}
                
                />
                <Text style={{
                      alignSelf:'center',
                      fontWeight:'bold'
                }}>
                  {item.authorname}
                </Text>
                
              </View>
      
              <View 
              
              style={{ 
                flex:1/2, 
                marginTop:10, 
              //  backgroundColor:'red',
                flexDirection:'column'
              }}
              >
              <TouchableOpacity 
              style={{ flex:1/2}}
              onLongPress={()=>{
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
                      firestore().collection('STORE')
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
              }}>
              <View>
              <ImageModal
                resizeMode="contain"
              
                imageBackgroundColor="white"
                style={{
                  width:150,
                  height:150,
                  borderRadius:10,
                  alignSelf:'center'
                }}

                source={{ uri: item.image}}
              />
              </View>
              </TouchableOpacity>
              



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
                flexDirection:'column', 
                justifyContent:'space-between',
           
                alignSelf:'center'
               // backgroundColor:'red'
                }}>


              </View>

              
              <View style={{ 
                flexDirection:'row', 
                justifyContent:'space-between',
                marginLeft:10,
                marginRight:10,
       
               // backgroundColor:'red'
                }}>
              <Text style={{
                fontSize:15,
                color:'grey',
               // fontWeight:'bold',
                marginTop:10,
               // alignSelf:'center'
              }}>${item.price}</Text>

              <TouchableOpacity
              
              onPress={()=> { Linking.openURL(item.website);  }}
              >
                <Text style={{
                fontSize:15,
                color:'#05c7fc',
                fontWeight:'bold',
                marginTop:10,
               // backgroundColor:'red',
      
               // alignSelf:'center'
                }}>Website</Text>
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



export  {StoreScreen};




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