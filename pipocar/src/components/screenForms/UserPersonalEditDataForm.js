  
//Essa é a aplicação Ngambwe, todos os direitos estão reservados para empresa @Uajiza
// Uajiza - 2020
import React, { Component } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity,
  Image
} from "react-native";
import { 
    Input,
    InputForPosts,
    InputDataEdit

} from '../reusebleComponents/index'
import ImageBlurLoading from 'react-native-image-blur-loading';
import style from "react-native-image-blur-loading/src/style";

/* 

<InputDataEdit
placeholder="Heyyy"
value={this.state.userBio}
onChangeText={text => this.setState({ userBio:text})}

/>

 */









class  UserPersonalEditDataForm extends Component {
onButtonPress()
    { 
        console.log('UPLOAD PUBLISH!!!')
         this.UploadPublish();  
    
    }

constructor(props)
    {
      super(props)
  
      this.modalizeAccountRef = React.createRef();
  
      this.modalizeFavoritetRef = React.createRef();
      this.state = {
        userName:'',
        userID:'',
        userLocation:'',
        userBio:'',
        loaded: false,
        imagePath:'https://firebasestorage.googleapis.com/v0/b/pipocar-61cd8.appspot.com/o/groupCovers%2Fcrowd.png?alt=media&token=0f2ecb98-b3d7-40b6-af96-5e6eaeed6370',
        data:[],
      }
  
  
    }




render(){ 
  console.log('MessageForm');
  return (  
    <View style={{ 
        //alignSelf:'center'
        backgroundColor:'#f5f5f5',
        flex:1,
        }}>
        <View style={{ marginLeft:10, marginRight:10,}}>
        <View>
            <TouchableOpacity 
            style={{
                marginTop:'30%',
                borderWidth:1,
                borderColor:'#05c7fc',
                padding:10,
                alignSelf:'center',
                backgroundColor:'white',
                marginBottom:10,

            }}>
                <ImageBlurLoading
                thumbnailSource={{ uri:this.state.imagePath}}
                source={{ uri:this.state.imagePath}}
                style={{
                    width:100,
                    height:100,
                }}
                />
            </TouchableOpacity>
        </View>
        <View style={styles.MarginBettwenFields}>
            <Input
            placeholder="userName"
            value={this.state.userName}
            onChangeText={text => this.setState({ userName:text})}
            autoCorrect={false}
            autoCapitalize="none"


            
            />
        </View>
        <View style={styles.MarginBettwenFields}>
            <Input
            placeholder="userID"
            value={this.state.userID}
            onChangeText={text => this.setState({ userID:text})}
            autoCorrect={false}
            autoCapitalize="none"
            
            />
        </View>
        <View style={styles.MarginBettwenFields}>
            <Input
            placeholder="userBio"
            value={this.state.userBio}
            onChangeText={text => this.setState({ userBio:text})}
            autoCorrect={false}
            autoCapitalize="none"
            
            
            />
        </View>

        <View>
        <TouchableOpacity  //onPress={this.onButtonPress.bind(this)}
        >
                      <View  
                          
                      style={{
                      //  marginBottom:30,
                        justifyContent:'center',
                        alignSelf:'center',
                        backgroundColor:'#44e300',
                        width:'100%',
                        height:60,
                        borderRadius:5,
                        marginTop:10,
                      }}>  
                      <Text 
                      style={{
                      fontSize:20,
                      textAlign:'center',
                      color:'white',
                      fontWeight:'bold'
                
                      }}> Finish </Text>
                
                
                      </View>
                      </TouchableOpacity>
        </View>


    </View>
    </View>
 
  );
}
}



export default UserPersonalEditDataForm;


const styles = {

    MarginBettwenFields : {
        marginBottom:'20%',
    }
}