import React from 'react';
import { StyleSheet, View } from 'react-native';
import GooglePlacesInput from '../components/GooglePlacesInput';
import Map from '../components/Map';

const GoogleMapScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.mapContainer}>
        <Map style={styles.map} options={{ showsMyLocationButton: true }} />
      </View>
      <GooglePlacesInput />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  mapContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GoogleMapScreen;
