import { useState, useEffect } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../configs';

const useGooglePlaces = (lat, lng) => {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState();
  console.log({ GOOGLE_MAPS_API_KEY, places });
  useEffect(() => {
    if (!lat || !lng || places.length) {
      return;
    }

    fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=50&&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`,
    )
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.status === 'OK') {
          const placesResp = responseJson.results.map(rawPlace => {
            return {
              id: rawPlace.place_id,
              title: rawPlace.name,
              lat: rawPlace.geometry.location.lat,
              lng: rawPlace.geometry.location.lng,
              icon: rawPlace.icon,
            };
          });
          setPlaces(placesResp);
        } else {
          console.warn(responseJson.status);
        }
      })
      .catch(err => {
        setError(err);
      });
  }, [places, lat, lng]);

  return Object.assign([places, error], {
    places,
    error,
  });
};

export default useGooglePlaces;
