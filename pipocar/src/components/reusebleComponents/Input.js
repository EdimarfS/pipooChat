import React from 'react';
import { TextInput,View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const Input = ({ value, onChangeText, label, placeholderTextColor, paddingRight , paddingLeft, placeholder, autoCapitalize, autoCorrect, secureTextEntry, multiline, numberOfLines, maxLength}) =>{

const {container, TextInputStyle} = styles;

return( <View style={{ flex:1 }}>
                <TextInput   
                   style={TextInputStyle}
                   label={label}
                   value={value}
                   onChangeText={onChangeText}
                   placeholder={placeholder}
                   placeholderTextColor={placeholderTextColor}
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
        height:60,
        fontSize:15,
        backgroundColor:'white',
        padding:10,
        borderColor:'#c7c7c7',
        //borderWidth:1,
        borderBottomWidth:0.3,
      //  borderRadius:10,
        
     },   
}

export { Input };