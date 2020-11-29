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

        <Lottie
        style={{
          width:50,
          height:50,
        }}
        ref={animation => {
          this.animation = animation;
        }}
        source={spinner}
      />

    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',

  },
});


export  {Spinner};