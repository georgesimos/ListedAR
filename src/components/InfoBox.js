import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Context as LocationContext } from '../context/LocationContext';

const InfoBox = () => {
  const {
    state: { currentLocation, directions },
  } = useContext(LocationContext);
  return directions || currentLocation ? (
    <View style={styles.container}>
      {currentLocation && <Text>{JSON.stringify(currentLocation)}</Text>}
      {directions && (
        <>
          <Text>{`Distance: ${directions.distance} km`}</Text>
          <Text>{`Duration: ${directions.duration} min.`}</Text>
        </>
      )}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    justifyContent: 'flex-start',
    padding: 10,
    height: 'auto',
  },
});

export default InfoBox;
