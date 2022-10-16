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

export default ({ style, options = {} }) => {
  const {
    state: { currentLocation, destination, destinationLatLong },
    addDestinationLatLong,
    addDirections,
  } = useContext(LocationContext);

  const [newPoi, setNewPoi] = useState();

  const [places] = useGooglePlaces(
    currentLocation?.coords?.latitude,
    currentLocation?.coords?.longitude,
  );

  const onPressMap = e => {
    setNewPoi({ coordinate: e.nativeEvent.coordinate });
  };

  const onPoiClick = e => {
    const poi = e.nativeEvent;
    console.log(poi);
  };

  if (!currentLocation) {
    return null;
  }

  console.log({ currentLocation, destination, destinationLatLong, places });

  return (
    <MapView
      style={style}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      showsUserLocation
      showsMyLocationButton
      onPress={e => onPressMap(e)}
      onPoiClick={onPoiClick}
      {...options}>
      {places.length > 0 &&
        places.map(place => (
          <Marker
            key={place.id}
            icon={place.icon}
            coordinate={{ latitude: place.lat, longitude: place.lng }}
            onPress={e => {
              const {
                nativeEvent: { coordinate },
              } = e;
              console.log(coordinate);
            }}>
            <View>
              <Image
                source={{
                  uri: place.icon,
                }}
                style={styles.stretch}
              />
              <Text>{place.title}</Text>
            </View>
          </Marker>
        ))}
      {newPoi && (
        <Marker
          coordinate={newPoi.coordinate}
          anchor={{ x: 0.5, y: 0.5 }}
          image={carImage}
        />
      )}
      {destinationLatLong && (
        <Marker
          coordinate={destinationLatLong}
          anchor={{ x: 0.5, y: 0.5 }}
          image={carImage}
        />
      )}
      {destination && (
        <MapViewDirections
          origin={{
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          }}
          destination={destination.description}
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
          }}
          onError={errorMessage => {
            console.log('GOT AN ERROR', errorMessage);
          }}
        />
      )}
    </MapView>
  );
};
