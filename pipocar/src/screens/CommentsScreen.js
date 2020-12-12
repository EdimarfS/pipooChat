import { Imag } from '@tensorflow/tfjs';
import React,{Component} from 'react';
import { 
    View,
    FlatList,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    TextInput

} from 'react-native';



class CommentsScreen extends Component { 

render()
{
    const { data }  = this.props;
    console.log(data);
    return(
        <KeyboardAvoidingView>

        </KeyboardAvoidingView>
        
    );
}



}

export {CommentsScreen};