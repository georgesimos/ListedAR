import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import ArScene from '../scenes/ArScene/ArScene';

const ARScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.viroContainer}>
        <ViroARSceneNavigator
          worldAlignment="GravityAndHeading"
          initialScene={{ scene: ArScene }}
          viroAppProps={{ myProps: {} }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  viroContainer: { ...StyleSheet.absoluteFillObject },
});

export default ARScreen;
