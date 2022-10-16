import { ImageBackground, StyleSheet, Text } from 'react-native';
import React from 'react';

const Header = ({ image, title }) => {
  return (
    <ImageBackground
      accessibilityRole="image"
      source={{ uri: image }}
      style={styles.background}
      imageStyle={styles.logo}>
      <Text style={styles.text}>{title}</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: '#F3F3F3',
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    resizeMode: 'cover',
  },
  text: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    color: '#000',
  },
});

export default Header;
