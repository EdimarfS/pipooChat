  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text,
  TouchableOpacity,
  FlatList
} from "react-native";
import  { 
Input,
} from '../components/reusebleComponents/index';
/*
      <View 
      style={{
        marginTop:'22%',
        flexDirection:'row',
        justifyContent:'flex-end'

      }}>
        <TouchableOpacity style={{
          width:100,
          height:50,
          marginRight:10,
          borderWidth:0.3,
         // borderRadius:5,
        }}>

        </TouchableOpacity>

        <TouchableOpacity 
        style={{
          width:100,
          height:50,
          marginRight:5,
          //backgroundColor:'white',
          borderWidth:0.3,
         // borderRadius:5,
        }}>

        </TouchableOpacity>
      </View>
*/


class  ChatScreen extends Component {


  data = [
    {
        travel : 'Travel',
        key:1,
    
        healthAndwellness : 'Health and wellness',
        key:2,

        beauty : 'Beauty',
        key:3,
        
        food_And_drink : 'Food and drink',
        key:4,

        motivational_quotes: 'Motivational quotes',
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
            <View style={{ flexDirection:'row', marginTop:20 }}>
              <View style={styles.categoryContainer1}>
                 <Text style={styles.categoryText1}>#{item.travel}</Text>
              </View>
              <View style={styles.categoryContainer2}>
                 <Text style={styles.categoryText2}>#{item.healthAndwellness}</Text>
              </View>
              <View style={styles.categoryContainer3}>
                 <Text style={styles.categoryText3}>#{item.beauty}</Text>
              </View>
              <View style={styles.categoryContainer4}>
                 <Text style={styles.categoryText4}>#{item.food_And_drink}</Text>
              </View>
              <View style={styles.categoryContainer5}>
                 <Text style={styles.categoryText5}>#{item.motivational_quotes}</Text>
              </View>
              <View style={styles.categoryContainer7}>
                 <Text style={styles.categoryText7}>#{item.sport}</Text>
              </View>
              <View style={styles.categoryContainer6}>
                 <Text style={styles.categoryText6}>#{item.other}</Text>
              </View>
              
              
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