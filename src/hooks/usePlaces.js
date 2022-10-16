import React from 'react';
import { onValue, ref } from 'firebase/database';
import { database } from '../firebase/config';

const usePlaces = () => {
  const [places, setPlaces] = React.useState([]);
  const [placesByCategory, setPlacesByCategory] = React.useState();

  React.useEffect(() => {
    if (places.length) {
      return;
    }

    const reference = ref(database, 'places');
    onValue(reference, snapshot => {
      const placesArr = [];
      snapshot.forEach(childSnapshot => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        placesArr.push({ ...childData, id: childKey });
      });

      const grouped = placesArr.reduce((catetories, item) => {
        const category = catetories[item.category] || [];
        return {
          ...catetories,
          [item.category]: [...category, item],
        };
      }, {});

      setPlacesByCategory(grouped);
      setPlaces(placesArr);
    });
  }, [places]);

  return Object.assign([places, placesByCategory], {
    places,
    placesByCategory,
  });
};

export default usePlaces;
