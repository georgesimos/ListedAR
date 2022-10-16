/* eslint-disable react-hooks/exhaustive-deps */
import 'react-native-gesture-handler';
import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  Context as LocationContext,
  Provider as LocationProvider,
} from './context/LocationContext';
import useLocation from './hooks/useLocation';
import RootStack from './navigation/RootStack';

const locationOptions = {
  watch: true,
  accuracy: {
    ios: 'bestForNavigation',
  },
  enableHighAccuracy: true,
  distanceFilter: 10,
  forceRequestLocation: true,
  showsBackgroundLocationIndicator: true,
};

const App = () => {
  const { addCurrentLocation } = useContext(LocationContext);
  const [location] = useLocation(locationOptions);

  useEffect(() => {
    if (location) {
      addCurrentLocation(location);
    }
  }, [location]);

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

const Provider = () => (
  <LocationProvider>
    <App />
  </LocationProvider>
);

export default Provider;
