import React from 'react';
import { View } from 'react-native';
import { auth } from '../firebase/config';

const AuthControl = ({ navigation }) => {
  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      user
        ? navigation.navigate('TabNavigation')
        : navigation.navigate('Login');
    });
  }, [navigation]);

  // eslint-disable-next-line react-native/no-inline-styles
  return <View style={{ flex: 1, backgroundColor: 'white' }} />;
};
export default AuthControl;
