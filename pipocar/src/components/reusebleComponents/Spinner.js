import React, { Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import spinner from '../../assets/spinner.json';
import Lottie from 'lottie-react-native';

class Spinner extends Component {

  componentDidMount() {
    this.animation.play();
    // Or set a specific startFrame and endFrame with:
    this.animation.play(1, 120);
  }

  render(){
  return (
    <View style={styles.container}>
        <View style={{
         // backgroundColor:'#f5f5f5',
          width:50,
          height:50,
          justifyContent:'center',
          borderRadius:10
        }}>
        <Lottie
        ref={animation => {
          this.animation = animation;
        }}
        source={spinner}
      />
        </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
});


export  {Spinner};