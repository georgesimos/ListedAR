import React, { useContext } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '../configs';
import { Context as LocationContext } from '../context/LocationContext';

const GooglePlacesInput = () => {
  const { addDestination } = useContext(LocationContext);

  return (
    <GooglePlacesAutocomplete
      placeholder="Where To Go"
      query={{
        key: GOOGLE_MAPS_API_KEY,
        language: 'en', // language of the results
      }}
      onPress={addDestination}
      onFail={error => console.error(error)}
      styles={{
        container: {
          padding: 10,
          paddingTop: 60,
        },
        textInput: {
          backgroundColor: '#FFFFFF',
          color: '#000',
        },
        description: { color: '#000' },
      }}
    />
  );
};

export default GooglePlacesInput;
