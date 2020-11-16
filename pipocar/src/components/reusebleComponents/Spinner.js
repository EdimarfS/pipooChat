import React, { Component} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';


class Spinner extends Component {

  render(){
  return (
    <View style={styles.container}>
        <View style={{
          backgroundColor:'#f5f5f5',
          width:50,
          height:50,
          justifyContent:'center',
          borderRadius:10
        }}>
        <ActivityIndicator/>
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