import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'


class Test extends Component{ 
  getInitialState() {
    return {
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
      }),
    };
  }


  componentWillReceiveProps(nextProps) {
    const duration = 500
  
    if (this.props.coordinate !== nextProps.coordinate) {
      if (Platform.OS === 'android') {
        if (this.marker) {
          this.marker.animateMarkerToCoordinate(
            nextProps.coordinate,
            duration
          );
        }
      } else {
        this.state.coordinate.timing({
          ...nextProps.coordinate,
          duration
        }).start();
      }
    }
  }
  
  render() {
    return (
      <MapView 
      
    //  initialRegion={...}
      >
        <MapView.Marker.Animated
          ref={marker => { this.marker = marker }}
          coordinate={this.state.coordinate}
        />
      </MapView>
    );
  }


}



export default Test;