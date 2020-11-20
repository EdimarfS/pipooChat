  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import  { 
Input,
} from '../components/reusebleComponents/index';
import firestore from '@react-native-firebase/firestore';


class  ChatScreen extends Component {

  constructor(props)
  {
    super(props)
    this.state={ 
      query:"",
      data:[],
      fullData:[],
      found:false,

    }
  }


//This will run each time the App is called
UNSAFE_componentWillMount()
{ 

  this._isMounted = false;
    //we are calling here the funtion to get all the groups
    this.fetchCreateGroup();

    

  

}

//This functions is fetching the group names that we created 
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

render(){ 
  console.log('ChatScreen');
  return (
    <View style={styles.container}>
      <View 
      style={{
        flex:1,
        justifyContent:'center',
      // alignSelf:'center'
      }}>
        <Text 
        style={{
          fontSize:58,
          fontWeight:'bold'
        }}>
          Chat
        </Text>

        <FlatList
        data={this.data}
        showsVerticalScrollIndicator ={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={ item => item.key.toString()}
        //numColumns={3}
        horizontal 
        renderItem={({item}) => {

          return(
            <View style={{ 
              flexDirection:'row', 
              marginTop:20,
              //backgroundColor:'red',
              height:30,
              }}>
              <TouchableOpacity>
              <View style={styles.categoryContainer1}>
                 <Text style={styles.categoryText1}>#{item.travel}</Text>
              </View>
              </TouchableOpacity>
              
              <TouchableOpacity>
              <View style={styles.categoryContainer2}>
                 <Text style={styles.categoryText2}>#{item.healthAndwellness}</Text>
              </View>
              </TouchableOpacity>
              
              <TouchableOpacity>
              <View style={styles.categoryContainer3}>
                 <Text style={styles.categoryText3}>#{item.beauty}</Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity>
              <View style={styles.categoryContainer4}>
                 <Text style={styles.categoryText4}>#{item.food_And_drink}</Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity>
              <View style={styles.categoryContainer5}>
                 <Text style={styles.categoryText5}>#{item.motivational_quotes}</Text>
              </View>
              </TouchableOpacity>

              <TouchableOpacity>
              <View style={styles.categoryContainer7}>
                 <Text style={styles.categoryText7}>#{item.sport}</Text>
              </View>
              </TouchableOpacity>
              
              <TouchableOpacity>
              <View style={styles.categoryContainer6}>
                 <Text style={styles.categoryText6}>#{item.other}...</Text>
              </View>
              </TouchableOpacity>
              
              
            </View>
          )

        }}
        
        
        />
        

      </View>



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
    alignSelf:'center'
  },
  categoryText2:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center'

  },
  categoryText3:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center'
  },
  categoryText4:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center'
  },
  categoryText5:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center'
  },  
  categoryText6:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center'
  },  
  categoryText7:{
    fontWeight:'bold',
    justifyContent:'center',
    alignSelf:'center'
  },
  categoryContainer1:{
    backgroundColor:'#00d9ff',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',



  },
  categoryContainer2:{
    backgroundColor:'#cbffbf',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer3:{
    backgroundColor:'#ffc9fc',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer4:{
    backgroundColor:'#ffea00',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer5:{
    backgroundColor:'#ff6a00',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer6:{
    backgroundColor:'#ff005d',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },
  categoryContainer7:{
    backgroundColor:'#00ddff',
    width:100,
    height:30,
    borderRadius:90,
    justifyContent:'center',
    marginLeft:10,

  },

}