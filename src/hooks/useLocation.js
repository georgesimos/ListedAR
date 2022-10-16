import { useState, useEffect, useRef } from 'react';
import Geolocation from 'react-native-geolocation-service';

const useLocation = (props = {}) => {
  const [location, setLocation] = useState();
  const [error, setError] = useState();
  const locationWatchId = useRef(null);

  const clearLocationWatch = () =>
    locationWatchId.current && Geolocation.clearWatch(locationWatchId.current);

  useEffect(() => {
    const { watch, ...options } = props;

    if (watch) {
      locationWatchId.current = Geolocation.watchPosition(
        setLocation,
        setError,
        options,
      );
    } else {
      Geolocation.getCurrentPosition(setLocation, setError, options);
    }
    return clearLocationWatch;
  }, [props]);

  return Object.assign([location, error, clearLocationWatch], {
    location,
    error,
    clearLocationWatch,
  });
};

export default useLocation;
