import React from 'react';
import { TextInput,View, Text } from 'react-native';


const InputDataEdit = ({ 
    value, 
    onChangeText, 
    label, 
    placeholderTextColor, 
    paddingRight , 
    paddingLeft, 
    placeholder, 
    autoCapitalize, 
    autoCorrect, 
    secureTextEntry, 
    multiline, 
    numberOfLines, 
    maxLength,
}) =>{

const {container, TextInputStyle} = styles;

return( <View style={{ flex:1 }}>
                <TextInput   
                   style={TextInputStyle}
                   label={label}
                   value={value}
                   placeholderTextColor={placeholderTextColor} 
                   onChangeText={onChangeText}
                   placeholder={placeholder}
                   paddingRight={paddingRight}
                   paddingLeft={paddingLeft}
                   autoCorrect={autoCorrect}
                   autoCapitalize={autoCapitalize}
                   secureTextEntry={secureTextEntry}
                   multiline={multiline}
                   numberOfLines={numberOfLines}
                   maxLength={maxLength}
                   >
                   </TextInput>  
        </View>


    )
}

const styles = {
    TextInputStyle:{
        fontSize:17,
        textAlignVertical: 'top',
        width:'100%',
        height:40,
        fontSize:15,
        backgroundColor:'white',
        padding:10,
        borderColor:'#d9d9d9',
       // backgroundColor:'#f5f5f5',
        //borderWidth:1,
        borderBottomWidth:0.3,
       // backgroundColor:'red'
    
      //  borderRadius:10,
        
     },   
}

export { InputDataEdit };