import React, { Component, useRef } from 'react';
import { 
    Scene, 
    Router, 
    Stack, 
    Actions,
    ActionConst, 
    } from 'react-native-router-flux';
import {     
    View, 
    Text,
    TouchableOpacity
 } from 'react-native';
import { 
   IntroductionScreen,
   AddPostScreen,
   LoginScreen,
   SignScreen,
   ForgetPasswordScreen,
   FeedNewsScreen,
   ChatScreen,
   SettingScreen,
   UserPersonalDataScreen,
   CreateGroupScreen,
   UserPersonalEditDataScreen,
   PostCommentsScreen,

} from '../screens/index';

import MessageScreen from '../screens/MessageScreen';



           


/*  class TabIcon extends Component {

    render () {

        var color = this.props.focused
            ? this.props.activeTintColor //'#3b5998'
            : this.props.inactiveTintColor//'#93a8d5'


 
        let componentBody =
            <View style={{
            flex: 1, 
            flexDirection: 'column',
            alignItems: 'center', 
            alignSelf: 'center', 
            marginTop:7, 
            //backgroundColor:'red'
            }}>

                <Ionicons  style={{color: color}} name={this.props.iconName} size={28} onLongPress={this.props.onLongPress} /> 
           
            </View>

        return componentBody;
    }
} */
 
const RouterComponent = () => { 
    let sizeicons = 28;
    let tint_color = "#00c6e8";
    let inactive_Color = "#2b2b2b";



return(
    <Router>
    <Scene key="root">

            <Scene 
            key="auth" 
            hideNavBar
            >
                <Scene key="introduction">
                <Scene
                key="introductionscreen"
                component={IntroductionScreen}
                hideNavBar 
                initial
                />  
                </Scene>

                <Scene key="login">
                 <Scene
                key="loginscreen"
                component={LoginScreen}
                hideNavBar 
                />
                </Scene>

                <Scene key="sign">
                <Scene
                key="signscreen"
                component={SignScreen}
                hideNavBar 
                />
                </Scene>

                <Scene key="forgetpassword">
                <Scene
                key="forgetpasswordscreen"
                component={ForgetPasswordScreen}
                hideNavBar 
                />
                </Scene>


               <Scene key="userpersonaldata">
                <Scene
                key="userpersonaldatascreen"
                component={UserPersonalDataScreen}
                hideNavBar 
                />
                </Scene>
            </Scene>

            

            <Scene 
            key="messages"
            >
                <Scene
                key="messagesscreen"
                component={MessageScreen}
              //gesturesEnabled={false}
                hideNavBar
                
                />
            </Scene>

            <Scene key="userpersonaldata">
                <Scene
                key="userpersonaldatascreen"
                component={UserPersonalDataScreen}
                hideNavBar 
                />
            </Scene>

            <Scene key="userpersonaleditdata">
                <Scene
                key="userpersonaleditdatascreen"
                component={UserPersonalEditDataScreen}
                hideNavBar 
                />
            </Scene>



            <Scene key="addpost">
                <Scene
                key="addpostscreen"
                component={AddPostScreen}
                hideNavBar 
                />
            </Scene>

            <Scene key="postcomment">
                <Scene
                key="postcommentscreen"
                component={PostCommentsScreen}
                hideNavBar 
                />
            </Scene>

            <Scene key="userpersonaleditdata">
                <Scene
                key="userpersonaleditdatascreen"
                component={UserPersonalEditDataScreen}
                hideNavBar 
                />
            </Scene>

            <Scene key="creategroup">
                <Scene
                key="creategroupscreen"
                component={CreateGroupScreen}
                hideNavBar 
                />
            </Scene>



            <Scene 
            key="main"
            tabs
            swipeEnabled={true}
            
           // showLabel={false}
            tabStyle={{
                backgroundColor:'white',
               // borderRadius:10,
               // borderWidth:2,
              // backgroundColor:'red',
             //   height:18,
               // borderWidth:20,
              
            }}  
            hideNavBar
            > 
                    <Scene
                    key="feednews"
                    component={FeedNewsScreen}
                    iconName={"md-planet"}
                   // icon={TabIcon}
                    activeTintColor={tint_color}
                    inactiveTintColor={inactive_Color}
                    renderRightButton={
                        <TouchableOpacity onPress={()=>{ Actions.addpost()}}>
                            <Text style={{
                                fontSize:20,
                                marginRight:10,
                            }}>Add</Text>
                        </TouchableOpacity>
                        }
                        renderLeftButton={
                            <TouchableOpacity onPress={()=>{
                    
                            }}>
                                <Text style={{
                                    fontSize:20,
                                    marginLeft:10,
                                }}>Add</Text>
                            </TouchableOpacity>
                    }
                    renderTitle={()=>{
                        return(
                            <View style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center',
                                }}>
                                <Text style={{fontWeight:'bold',fontSize:20}}>pipoca</Text>
                          
                                

                            </View>
                        )
                    }}
                    />

                    <Scene
                    key="chat"
                    component={ChatScreen}
                    //iconName={"ios-chatboxes"}
                    //icon={TabIcon}
                    activeTintColor={tint_color}
                    inactiveTintColor={inactive_Color}
                    renderRightButton={
                        <TouchableOpacity onPress={()=>{ Actions.creategroup()}}>
                            <Text style={{
                                fontSize:20,
                                marginRight:10,
                            }}>Add</Text>
                        </TouchableOpacity>
                        }
                    />

                    <Scene
                    key="setting"
                    component={SettingScreen}
                    iconName={"ios-settings"}
                    //icon={TabIcon}
                    activeTintColor={tint_color}
                    inactiveTintColor={inactive_Color}
                    
                    renderTitle={()=>{
                        return(
                            <View style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center',
                                }}>
                                <Text style={{fontWeight:'bold',fontSize:20}}>settings</Text>
                          
                                

                            </View>
                        )
                    }}
                    />
 
                    
                    

            </Scene>


    </Scene>
</Router>


);



}


export  default RouterComponent;