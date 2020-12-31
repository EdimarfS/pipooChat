import { image } from '@tensorflow/tfjs';
import React,{Component} from 'react';
import { 
    View,
    FlatList,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    TextInput,
    Image,
    Alert

} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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
            flex:1,
            marginTop:15,
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
            const { postDetails } = this.props;
            return(
                <View
                style={{
                    flex:1,
                }}
                >
                    <TouchableOpacity
/*                     onPress={()=>{
                        if(item.author === auth().currentUser.uid){
                            Alert.alert(
                              item.userName,
                              `Do you want to delete ${item.userComment}`,
                              [
                                {
                                  text: "Cancel",
                                  onPress: () => console.log("Cancel Pressed"),
                                  style: "cancel"
                                },
                                { text: "OK", onPress: () => {

                                  firestore()
                                  .collection('COMMENTS')
                                  .doc(postDetails._id)
                                  .delete()
                                  .then(()=>{
                                    console.log('Document Successfully Deleted');
                                  })
                                  .catch(()=>{
                                    console.log('Something went wrong, could not be Deleted');
                                  })
                        
                                  //RealTime Database
                        
                                } }
                              ],
                              { cancelable: false }
                            );}

                    }} */
                    style={{
                        flexDirection:'row',
                        marginLeft:10,
                        marginRight:10,
                    }}>
                        <Image
                        source={{
                            uri:item.userProfilePicture,
                        }}
                        style={{
                            width:40,
                            height:40,
                            borderRadius:90,
                            marginTop:10,
                        }}
                        />
                        
                        <View
                        
                        style={{
                            flexDirection:'column',
                            marginLeft:10,
                        }}>
                        <Text
                        style={{
                            fontWeight:'bold'
                        }}
                        >{item.userName}</Text>
                        <Text
                        style={{
                            color:'grey'
                        }}
                        >{item.userComment}</Text>
                        </View>
                    </TouchableOpacity>
                 
                </View>
            )
        }}/>




        </View>
        
    );
}



}

export {CommentsScreen};