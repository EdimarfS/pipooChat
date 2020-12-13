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

import firestore from '@react-native-firebase/firestore';


class CommentsScreen extends Component { 

    constructor(props){
        super(props);

        this.state = { 
            data:''
        }

    }

    UNSAFE_componentWillMount()
    {
        this.fetchCOMMENTS();
    }

    fetchCOMMENTS = () => {

        const { postDetails } = this.props;

        firestore()
        .collection('COMMENTS')
        .doc(postDetails._id)
        .collection('all')
        .orderBy('posted', 'desc')
        .onSnapshot(querySnapshot => {
            
            var  data  = querySnapshot.docs.map(doc => {

                return {
                    _id : doc.id,
                    ...doc.data()
                }
            })

            this.setState({
              data:data,

            })
        }) 

        

      }


render()
{
    const { postDetails }  = this.props;
    console.log(postDetails);
    return(
        <View
        style={{
            flex:1
        }}
        >

        <FlatList
        data={this.state.data}
       // refreshing={this.state.refreshing} 
       // onRefresh={this.onRefresh}
        //ListHeaderComponent={this.renderHeader}
        //ListEmptyComponent={this.renderEmpty}
       // showsVerticalScrollIndicator ={false}
       // showsHorizontalScrollIndicator={false}
       // ListEmptyComponent={this._listEmptyComponent}
        keyExtractor={ item => item._id.toString()}
       // numColumns={3}
     //   horizontal ={true}

        renderItem={({item}) => {
            return(
                <View
                style={{
                    flex:1,
                }}
                >
                    <Text>
                    {item.userName}

                    </Text>
                 
                </View>
            )
        }}/>




        </View>
        
    );
}



}

export {CommentsScreen};