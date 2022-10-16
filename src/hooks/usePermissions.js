import { useState, useEffect } from 'react';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export default () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    check(PERMISSIONS.IOS.CAMERA)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.IOS.CAMERA).then(result => {
              // …
            });
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch(err => setError(err));
  }, []);

  return Object.assign([error], { error });
};
