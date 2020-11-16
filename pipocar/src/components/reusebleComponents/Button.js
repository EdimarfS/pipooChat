import React, { Component} from  'react';
import { View, Text, TouchableOpacity} from  'react-native';

/*
This is a  reusable button
*/

const  Button =  ({onPress, label}) => {

    const  {container, ButtonConatiner, ButtonText} = styles;

        return(
            <View style={container}>
                <TouchableOpacity 
                style={ButtonConatiner}
                activeOpacity={0.9}
                onPress={onPress}
                >
                    <Text style={ButtonText}>
                       {label}
                    </Text>
                </TouchableOpacity>
            </View>
        )
}

const styles = {
    container : {
      flex:1,
       // justifyContent:'center',
        alignItems:'center',
     //   backgroundColor:'red',
        marginTop:10,
       // marginBottom:10,
       alginSelf:'center',
    },
    ButtonConatiner: {
 
        backgroundColor:'#05c7fc',
        width:'100%',
        height:60,
        borderRadius:5,
        justifyContent:'center',
        alignItems:'center',
      //  marginTop:20,
        //borderRadius:10,
       // borderRadius:90,
    },
    ButtonText: {
        color:'white',
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold'
       

    }

}



export {Button};