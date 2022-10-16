import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// icons
import Icon from 'react-native-vector-icons/Feather';

const NavigationBack = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack(null)}
      style={styles.container}>
      <Icon color="black" size={25} name="chevron-left" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
  },
});

export default NavigationBack;
