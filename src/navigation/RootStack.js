import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './TabsNavgation';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AuthControl from '../screens/AuthControl';
import ModalEditProfile from '../screens/ModalEditProfile';
import ModalAddPlace from '../screens/ModalAddPlace';
import PlaceDetailsScreen from '../screens/PlaceDetailsScreen';
import NavigationBack from '../components/NavigationBack';

export const Stack = createNativeStackNavigator();

export default () => (
  <Stack.Navigator>
    <Stack.Group
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AuthControl" component={AuthControl} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
    </Stack.Group>
    <Stack.Group
      screenOptions={{
        headerLeft: () => <NavigationBack />,
      }}>
      <Stack.Screen name="PlaceDetailsScreen" component={PlaceDetailsScreen} />
    </Stack.Group>
    <Stack.Group
      screenOptions={{
        presentation: 'modal',
        headerLeft: () => <NavigationBack />,
      }}>
      <Stack.Screen
        options={{ title: 'Edit profile' }}
        name="ModalEditProfile"
        component={ModalEditProfile}
      />
      <Stack.Screen
        options={{ title: 'Add place' }}
        name="ModalAddPlace"
        component={ModalAddPlace}
      />
    </Stack.Group>
  </Stack.Navigator>
);
