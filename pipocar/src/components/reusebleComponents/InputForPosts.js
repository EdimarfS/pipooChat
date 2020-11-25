import React from 'react';
import { TextInput,View, Text } from 'react-native';


const InputForPosts = ({ value, onChangeText, label, placeholderTextColor, paddingRight , paddingLeft, placeholder, autoCapitalize, autoCorrect, secureTextEntry, multiline, numberOfLines, maxLength, editable}) =>{

const {container, TextInputStyle} = styles;

return( <View style={{ flex:1 }}>
                <TextInput   
                   editable={editable}
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
        height:40,
        fontSize:15,
        backgroundColor:'white',
        padding:10,
        borderColor:'#cccccc',
        //borderWidth:1,
        borderBottomWidth:0.3,
    
      //  borderRadius:10,
        
     },   
}

export { InputForPosts };