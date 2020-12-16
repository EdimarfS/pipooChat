import React from "react";
import { TouchableOpacity, Linking, Platform, View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";


export const LocationView = ({ location }) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: 'white', width: 250, height: 250 }}>
      <MapView
       provider={PROVIDER_GOOGLE}
        style={{ height: 250, width: 250, borderRadius:10 }}
        
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
        scrollEnabled={true}
        zoomEnabled={true}
      >
        <Marker
         tracksViewChanges={false}
        coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}>
        <Callout tooltip>
        <View>
            <View
            style={{
              flexDirection:'column',
              alignSelf:'flex-start',
              borderRadius:6,
              backgroundColor:'white',
              borderColor:'black'
            }}
            >
              <Text
              style={{
                fontWeight:'bold',
                fontSize:20,
              }}
              >I am here</Text>


            </View>

        </View>
      </Callout>


      </Marker>

      </MapView>
    </TouchableOpacity>
  );
};