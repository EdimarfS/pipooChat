  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text,
  TouchableOpacity,
  FlatList,
  Image
} from "react-native";
import  { 
  SearchBar
} from '../components/reusebleComponents/index';
import firestore from '@react-native-firebase/firestore';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';

/*


*/

class  ChatScreen extends Component {

  constructor(props)
  {
    super(props)
    this.state={ 
      query:"",
      data:[],
      fullData:[],
      found:false,
      category:'',
      onRefreshing:false,
      searchBarText:'',

    }
  }


//This will run each time the App is called
UNSAFE_componentWillMount()
{ 

    //we are calling here the funtion to get all the groups
    this.fetchCreateGroup();
  

}

//Handle Search 
handleSearch = (text) => {
  const formatQuery = text.toLowerCase();
  const data = _.filter(this.state.fullData, user => {
 
          if(user.category.toLowerCase().includes(formatQuery) || user.name.toLowerCase().includes(formatQuery) )
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












//This functions is fetching the group names that we created 
fetchCreateGroup = () => {

  console.log('Fetch Data Group!!!!!!!!!!!')
 firestore()
 .collection('MESSAGE_THREADS')
 .orderBy('latestMessage.createdAt', 'desc')
 .onSnapshot(querySnapshot => {
     
     var  thread  = querySnapshot.docs.map(doc => {

         return {
             _id : doc.id,
             name: '',
             color: '',
             latestMessage: { text : '' },
             ...doc.data()
         }
     })

     this.setState({
       data:thread,
       fullData:thread,
       onRefresh:false,
     })
 }) 

}



  data = [
    {
        travel : 'Travel',
        key:1,
    
        healthAndwellness : 'Education',
        key:2,

        beauty : 'MeetMe',
        key:3,
        
        food_And_drink : 'Food',
        key:4,

        motivational_quotes: 'Drinks',
        key:5,

        sport : 'Sport',
        key:6,
        
        other : 'Other',
        key:7,


        
    }
    
    
    ]



//Fecthing Groups
fetchCreateGroup = () => {

 firestore()
 .collection('MESSAGE_THREADS')
 .orderBy('latestMessage.createdAt', 'desc')
 .onSnapshot(querySnapshot => {
     
     var  thread  = querySnapshot.docs.map(doc => {

         return {
             _id : doc.id,
             name: '',
             color: '',
             latestMessage: { text : '' },
             ...doc.data()
         }
     })

     this.setState({
       data:thread,
       fullData:thread,
     })
 }) 

}




renderHeader = () => {
  return(
    <View>
        <View style={{ 
          flex:1,
         // alignSelf:'center'
         marginLeft:10
          
          }}>
        <Text 
        style={{
          fontSize:50,
          fontWeight:'bold',
          marginTop:10,
          marginBottom:40
         // backgroundColor:'red'
        }}>
          Chats 
        </Text>
        </View>
    <View style={{ 

      marginLeft:5,
      marginRight:5
      }}>
      <SearchBar
      placeholder="search a group or business...."
      onChangeText={this.handleSearch}
      />
    </View>


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
          <TouchableOpacity onPress={()=> this.handleSearch(item.travel)}>
          <View style={styles.categoryContainer1}>
             <Text style={styles.categoryText1}>@{item.travel}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.handleSearch(item.healthAndwellness)}>
          <View style={styles.categoryContainer2}>
             <Text style={styles.categoryText2}>@{item.healthAndwellness}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.handleSearch(item.beauty)}>
          <View style={styles.categoryContainer3}>
             <Text style={styles.categoryText3}>@{item.beauty}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.handleSearch(item.food_And_drink)}>
          <View style={styles.categoryContainer4}>
             <Text style={styles.categoryText4}>@{item.food_And_drink}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.handleSearch(item.motivational_quotes)}>
          <View style={styles.categoryContainer5}>
             <Text style={styles.categoryText5}>@{item.motivational_quotes}</Text>
          </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=> this.handleSearch(item.sport)}>
          <View style={styles.categoryContainer7}>
             <Text style={styles.categoryText7}>@{item.sport}</Text>
          </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=> this.handleSearch(item.other)}>
          <View style={styles.categoryContainer6}>
             <Text style={styles.categoryText6}>@{item.other}...</Text>
          </View>
          </TouchableOpacity>

          
          
          
        </View>
      )

    }}
    
    
    />
    </View>
    
  )
}


footerComponents = () => {

  return(
    <View style={{ flex:1,}}>
      <Text>hello</Text>
    </View>
  )

  
}


render(){ 
  console.log('ChatScreen');
  return (
        <View style={{ 
          flex:1, 
          backgroundColor:'#fafafa'
          }}>
        <FlatList
          data={this.state.data}
          refreshing={this.state.onRefreshing}
          onRefresh={this.fetchCreateGroup}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
         // numColumns={3}
         ListHeaderComponent={this.renderHeader}
         // ListEmptyComponent={this._listEmptyComponent}
         ListFooterComponentStyle={this.footerComponents}
          keyExtractor={ item => item._id.toString()}
          renderItem={({item}) => {
            console.log(item);
            return(

              <View>

              <TouchableOpacity 
              
              style={{ flex:1}}
              onPress={()=>{ Actions.messages({ title:item.name, thread:item}) }}>
              <View style={{
                flex:1, 


                marginTop:10,
                //borderWidth:0.3,
                marginLeft:10,
                marginRight:10,
            
               // padding:10,

              
              //  height:140,
                marginBottom:10,
                }}>

      
              <View 
              
              style={{ 
                flex:1, 
                marginTop:1, 
               //backgroundColor:'red',
                flexDirection:'row',
                
              }}
              >
              <View>
              <Image
              source={{
                uri:item.groupcover.groupcover
              }}
              style={{
                width:50,
                height:50,
                borderRadius:90,
               // borderWidth:2,
              //borderColor:'#05c7fc',
              //borderColor:'#00ff80',
                padding:10,
          


          
                
                //alignSelf:'center'
              }}
              />
              </View>
              



              <View style={{ 
                alignSelf:'center',
                //marginBottom:3,
               // backgroundColor:'red',
                marginLeft:20,
                }}>
              <View>
              <Text style={{
                fontWeight:'bold',
                textAlign:'center',
                fontSize:15
              }}>{item.name}</Text>
              </View>

              
              <View>
              <Text style={{
                fontSize:14,
                //color:'#05c7fc',
                color:'#e0e0e0',
                marginTop:10,
              }}>{item.category}</Text>
              </View>
              </View>















              </View>



              </View>
              </TouchableOpacity>
              </View>
            )


          }}/>
          </View>

  

        





    

 
  );
}
}



export  {ChatScreen};




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
   //borderRadius:90,
    justifyContent:'center',



  },
  categoryContainer2:{
   // backgroundColor:'#cbffbf',
    width:100,
    height:30,
   // borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer3:{
   // backgroundColor:'#ffc9fc',
    width:100,
    height:30,
   // borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer4:{
   // backgroundColor:'#ffea00',
    width:100,
    height:30,
   // borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer5:{
  //  backgroundColor:'#ff6a00',
    width:100,
    height:30,
  //  borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer6:{
  //  backgroundColor:'#ff005d',
    width:100,
    height:30,
   // borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer7:{
  //  backgroundColor:'#00ddff',
    width:100,
    height:30,
   // borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },

}