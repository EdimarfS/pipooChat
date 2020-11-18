import React from 'react';
import { TextInput,View, Text } from 'react-native';


const InputDataEdit = ({ value, onChangeText, label, placeholderTextColor, paddingRight , paddingLeft, placeholder, autoCapitalize, autoCorrect, secureTextEntry, multiline, numberOfLines, maxLength}) =>{

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
        height:40,
        fontSize:15,
        backgroundColor:'white',
        padding:10,
        borderColor:'#f0f0f0',
        //borderWidth:1,
        borderBottomWidth:0.3,
    
      //  borderRadius:10,
        
     },   
}

export { InputDataEdit };