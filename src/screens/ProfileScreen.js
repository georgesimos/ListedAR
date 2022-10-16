import React from 'react';
import { Alert } from 'react-native';
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';
import { openSettings } from 'react-native-permissions';
import { auth } from '../firebase/config';
import TouchLineItem from '../components/TouchLineItem';
import { colors, fonts } from '../constants';

const logout = async () => {
  await auth.signOut();
};

const ProfileScreen = ({ navigation }) => {
  const user = auth.currentUser;

  const alertSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure that you want to sign out?',
      [{ text: 'No' }, { text: 'Yes', onPress: () => logout() }],
      { cancelable: false },
    );
  };

  return (
    <View style={styles.mainFrame}>
      <SafeAreaView style={styles.profileContentFrame}>
        <View style={styles.profileContentFrame_ProfileFrame}>
          <View style={styles.profileContentFrame_avatarView}>
            <Avatar.Image
              source={{ uri: user?.photoURL }}
              style={styles.avatarImage}
              size={100}
            />
          </View>

          <View style={styles.profileContentFrame_userInfos}>
            <Text style={styles.userNameText}>{user.displayName}</Text>
            <Text style={styles.userEmailText}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.manageProfileContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ModalEditProfile')}
            style={styles.containerEditProfile}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <TouchLineItem
            onPress={() => navigation.navigate('ModalAddPlace')}
            text="Add new place"
          />

          <TouchLineItem
            onPress={() => openSettings()}
            text="App permissions"
          />

          <TouchLineItem onPress={() => null} text="Legal" />
          <TouchLineItem onPress={() => null} text="Help" />
          <TouchLineItem onPress={alertSignOut} text="Log Out" />

          <Text style={styles.versionText}>{`Version: 0.0.1`}</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerFrame: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('window').height / 8.5,
    borderBottomWidth: 1,
    borderBottomColor: '#eeee',
  },
  headerFrame_left: {
    width: '15%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  headerFrame_middle: {
    width: '70%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText: {
    paddingBottom: 17,
    color: 'black',
    fontSize: 17,
    // fontFamily: 'Roboto-Regular',
  },
  headerFrame_right: {
    width: '15%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  profileContentFrame: {
    marginTop: 30,
  },
  profileContentFrame_ProfileFrame: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
  },
  profileContentFrame_avatarView: {
    justifyContent: 'center',
    width: '40%',
    height: '100%',
    alignItems: 'center',
  },
  avatarImage: {
    backgroundColor: '#e0e0e0',
  },
  profileContentFrame_userInfos: {
    justifyContent: 'center',
    width: '60%',
    height: '100%',
  },
  userNameText: {
    fontSize: 23,
    // fontFamily: 'Roboto-Regular',
    letterSpacing: 0,
    marginBottom: 5,
  },
  userEmailText: {
    color: '#727987',
    fontSize: 14,
    // fontFamily: 'Roboto-Regular',
    letterSpacing: 0,
  },
  manageProfileContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerEditProfile: {
    alignItems: 'center',
    backgroundColor: colors.profileEditBackground,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  editProfileText: {
    color: colors.white,
    fontFamily: fonts.medium,
    paddingHorizontal: 16,
    paddingVertical: 8,
    textTransform: 'uppercase',
  },
  menuTextFrame: {
    marginLeft: 35,
    marginTop: 40,
  },
  menuText: {
    color: '#727987',
    marginBottom: 20,
    // fontFamily: 'Roboto-Light',
  },
  menuButtonFrame: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButtonTextFrame: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 53,
    height: 53,

    // borderRadius: '50%',
  },
  menuButtonText: {
    marginLeft: 15,
    fontSize: 17,
  },
  menuButtonArrowFrame: {
    width: '15%',
  },
  ticketIconImage: {
    tintColor: 'white',
    width: '75%',
    height: '75%',
  },
  menuButtonTouchFrame: {
    marginBottom: 20,
    borderBottomColor: colors.inactiveGrey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
    paddingVertical: 20,
  },
  logoutText: {
    color: '#ff6e3f',
    marginBottom: 20,
    // fontFamily: 'Roboto-Medium',
    fontSize: 18,
  },
  versionText: {
    color: colors.inactiveGrey,
    fontFamily: fonts.regular,
    fontSize: 18,
    marginLeft: 16,
    paddingVertical: 16,
  },
});

export default ProfileScreen;
