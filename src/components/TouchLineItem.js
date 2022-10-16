import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '../constants';

import Icon from 'react-native-vector-icons/Feather';

const TouchLineItem = ({ icon, iconSize, onPress, text }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={styles.container}>
    {icon && (
      <View style={styles.icon}>
        {React.cloneElement(icon, { size: iconSize })}
      </View>
    )}
    <Text style={styles.text}>{text}</Text>
    <View style={styles.arrow}>
      <Icon color="black" size={25} name="chevron-right" />
    </View>
  </TouchableOpacity>
);

TouchLineItem.defaultProps = {
  icon: null,
  iconSize: 20,
};

TouchLineItem.propTypes = {
  // required
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,

  // optional
  icon: PropTypes.element,
  iconSize: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.inactiveGrey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16,
    paddingRight: 16,
    paddingVertical: 20,
  },
  icon: {
    justifyContent: 'center',
    marginRight: 16,
  },
  text: {
    color: colors.black,
    flex: 2,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  arrow: {
    justifyContent: 'center',
  },
});

export default TouchLineItem;
