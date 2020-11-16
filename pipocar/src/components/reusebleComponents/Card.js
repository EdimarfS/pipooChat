import { StatusBar } from 'expo-status-bar';
import Reactm, { Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';


class Card extends Component {

  render(){
  return (
    <View style={styles.container}>
      <Text> Card </Text>
      <StatusBar style="auto" />
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


export  {Card};