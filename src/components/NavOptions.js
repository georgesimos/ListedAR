import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const NavOptions = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={navData}
      horizontal
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          styles={styles.appButtonContainer}>
          <View>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={{ marginTop: 2, fontSize: 18, fontWeight: 'bold' }}>
              {item.title}
            </Text>
            <Icon
              style={styles.icon}
              type="antdesign"
              color="white"
              name="arrowright"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export const navData = [
  {
    id: '123',
    title: 'View the map',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
  {
    id: '456',
    title: 'Order Food',
    image: 'https://links.papareact.com/28w',
    screen: 'EatsScreen',
  },
];

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  icon: {
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default NavOptions;
