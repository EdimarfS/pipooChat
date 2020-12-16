import React from "react";
import MapView from 'react-native-maps';
import { TouchableOpacity, Linking, Platform } from 'react-native';

/*
          latitude: location.latitude,
          longitude: location.longitude,*/

export const LocationView = ({ location }) => {


    function openMaps () {
    console.log('Open Maps!!!!!!!');
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${location.latitude},${location.longitude}`,
      android: `http://maps.google.com/?q=${location.latitude},${location.longitude}`,
    });
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        }
      })
      .catch((err) => {
        console.error('An error occurred', err);
      });
  };
  return (
    <TouchableOpacity
      onPress={openMaps}
      style={{ backgroundColor: 'white', width: 250, height: 250 }}>
      <MapView
      //  provider={PROVIDER_GOOGLE}
        style={{ height: 250, width: 250 }}
        
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        annotations={[
          {
            latitude: location.latitude,
            longitude: location.longitude,

          },
        ]}
        scrollEnabled={false}
        zoomEnabled={false}
      />
    </TouchableOpacity>
  );
};