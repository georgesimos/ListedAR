import React from 'react';
import { Platform } from 'react-native';
import { ViroFlexView, ViroImage, ViroText } from '@viro-community/react-viro';
import { calculateDistance, latLongToMerc } from '../../utils';
import { useNavigation } from '@react-navigation/native';

const PlaceNodes = ({ places, currentLocation, initialized }) => {
  const navigation = useNavigation();
  if (!places || !currentLocation || !initialized) {
    return null;
  }

  const transformGpsToAR = (lat, lng) => {
    const isAndroid = Platform.OS === 'android';
    const latObj = lat;
    const longObj = lng;
    const latMobile = currentLocation.coords.latitude;
    const longMobile = currentLocation.coords.longitude;

    const deviceObjPoint = latLongToMerc(latObj, longObj);
    const mobilePoint = latLongToMerc(latMobile, longMobile);
    const objDeltaY = deviceObjPoint.y - mobilePoint.y;
    const objDeltaX = deviceObjPoint.x - mobilePoint.x;

    if (isAndroid) {
      let degree = currentLocation.coords.heading;
      let angleRadian = (degree * Math.PI) / 180;
      let newObjX =
        objDeltaX * Math.cos(angleRadian) - objDeltaY * Math.sin(angleRadian);
      let newObjY =
        objDeltaX * Math.sin(angleRadian) + objDeltaY * Math.cos(angleRadian);
      return { x: newObjX, z: -newObjY };
    }

    return { x: objDeltaX, z: -objDeltaY };
  };

  const onPlaceClick = place => {
    navigation.navigate('PlaceDetailsScreen', place);
  };

  return places.map((item, index) => {
    const coords = transformGpsToAR(
      item.coordinate.latitude,
      item.coordinate.longitude,
    );

    const distance = calculateDistance(item.coordinate, currentLocation.coords);

    const scale = Math.abs(Math.round(coords.z / 2));

    const distanceFormatted =
      distance > 1000
        ? (distance / 1000).toFixed(1) + ' km'
        : distance.toFixed(1) + ' m';

    return (
      <ViroFlexView
        key={`place-card-${index}-${item.id}`}
        style={{
          flexDirection: 'row',
          padding: 0.1,
          backgroundColor: '#ffff',
        }}
        width={2.5}
        height={1.0}
        position={[coords.x, 0, coords.z]}
        scale={[scale, scale, scale]}
        transformBehaviors="billboard"
        onClick={() => onPlaceClick(item)}
        visible={distance <= 1500}>
        <ViroImage source={{ uri: item.image }} style={{ flex: 0.4 }} />
        <ViroFlexView
          style={{ flex: 0.6, flexDirection: 'column', paddingLeft: 0.1 }}>
          <ViroText
            style={{
              fontSize: 20,
              color: '#000',
            }}
            text={item.name}
          />
          <ViroText
            style={{
              fontSize: 15,
              color: '#222222',
            }}
            text={item.description}
          />
          <ViroText
            textAlign="right"
            style={{
              fontSize: 12,
              color: '#222222',
            }}
            text={distanceFormatted}
          />
        </ViroFlexView>
      </ViroFlexView>
    );
  });
};

export default PlaceNodes;
