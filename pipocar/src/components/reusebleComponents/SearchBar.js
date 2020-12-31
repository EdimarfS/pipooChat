import React from 'react';
import { TextInput,View, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const SearchBar = ({ value, onChangeText, label, placeholderTextColor, paddingRight , paddingLeft, placeholder, autoCapitalize, autoCorrect, secureTextEntry, multiline, numberOfLines, maxLength}) =>{

const {container, TextInputStyle} = styles;

return( <View style={{ 
  flex:1, 
  alignItems:'center',
  flexDirection:'row',
  backgroundColor:'#f7f7f7',
  borderRadius:10,
  height:40,
  }}>

              <MaterialIcons 
              style={{
                marginLeft:4,
              }}
              name="search" size={24} color="grey" />
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
        padding:10,
        borderColor:'#e8e8e8',
        borderBottomWidth:0.3,

        
     },   
}

export { SearchBar };