import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import ARScreen from '../screens/ARScreen';
import { Dimensions } from 'react-native';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
// import GoogleMapScreen from '../screens/GoogleMapScreen';

const Tab = createBottomTabNavigator();

const TabsNavgation = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: Dimensions.get('window').height / 9,
      },
    }}>
    <Tab.Screen
      name="HomeStack"
      component={HomeStack}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Icon name="home" color={focused ? color : 'black'} size={size} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Map"
      component={GoogleMapScreen}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Icon name="map" color={focused ? color : 'black'} size={size} />
        ),
      }}
    /> */}
    <Tab.Screen
      name="ArMap"
      component={ARScreen}
      options={{
        tabBarIcon: ({ color, focused, size }) => (
          <Icon name="aperture" color={focused ? color : 'black'} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="ProfileStack"
      component={ProfileStack}
      options={{
        tabBarIcon: ({ color, focused, size }) => (
          <Icon name="user" color={focused ? color : 'black'} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabsNavgation;
