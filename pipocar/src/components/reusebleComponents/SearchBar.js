import React from 'react';
import { TextInput,View, Text } from 'react-native';


const SearchBar = ({ value, onChangeText, label, placeholderTextColor, paddingRight , paddingLeft, placeholder, autoCapitalize, autoCorrect, secureTextEntry, multiline, numberOfLines, maxLength}) =>{

const {container, TextInputStyle} = styles;

return( <View style={{ flex:1, alignItems:'center' }}>
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
        fontSize:10,
        textAlignVertical: 'top',
        width:'90%',
        height:40,
        fontSize:15,
        backgroundColor:'#f7f7f7',
      //  backgroundColor:'red',
        padding:10,
        borderColor:'#e8e8e8',
        //borderWidth:1,
        borderBottomWidth:0.3,
        borderRadius:90,
        borderWidth:1,
        alignSelf:'center'
    
      //  borderRadius:10,
        
     },   
}

export { SearchBar };