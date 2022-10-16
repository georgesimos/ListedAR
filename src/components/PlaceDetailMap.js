import React, { useState, useContext } from 'react';
import { Text, View } from 'react-native';
import { Dimensions, Image, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_API_KEY } from '../configs';
import { Context as LocationContext } from '../context/LocationContext';
import useGooglePlaces from '../hooks/useGooglePlaces';
import carImage from '../assets/car.png';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 38.00423250286659;
const LONGITUDE = 23.882492126034105;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = 0.02 * ASPECT_RATIO;

const styles = StyleSheet.create({
  stretch: {
    width: 30,
    height: 30,
    resizeMode: 'stretch',
  },
});

export default ({ style, destination, options = {} }) => {
  const {
    state: { currentLocation, destinationLatLong },
    addDestinationLatLong,
    addDirections,
  } = useContext(LocationContext);

  const mapRef = React.useRef(null);

  if (!currentLocation) {
    return null;
  }

  return (
    <MapView
      ref={mapRef}
      style={style}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      showsUserLocation
      showsMyLocationButton
      {...options}>
      {destinationLatLong && <Marker coordinate={destinationLatLong} />}
      {destination && (
        <MapViewDirections
          origin={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          }}
          destination={destination.coordinate}
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={6}
          strokeColor="#00b2ff"
          lineDashPattern={[30, 20]}
          geodesic={true}
          optimizeWaypoints={true}
          precision="high"
          mode="WALKING"
          onStart={params => {
            console.log(JSON.stringify(params));
          }}
          onReady={result => {
            console.log({ result });
            const { coordinates } = result;
            addDirections(result);
            addDestinationLatLong(coordinates[coordinates.length - 1]);
            console.log(`Distance: ${result.distance} km`);
            console.log(`Duration: ${result.duration} min.`);

            mapRef.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: width / 20,
                bottom: height / 20,
                left: width / 20,
                top: height / 20,
              },
            });
          }}
          onError={errorMessage => {
            console.log('GOT AN ERROR', errorMessage);
          }}
        />
      )}
    </MapView>
  );
};
