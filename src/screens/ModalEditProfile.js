import React, { useEffect, useState } from 'react';
import { onValue, ref, set } from 'firebase/database';
import { database, auth } from '../firebase/config';
import { Button, TextInput } from 'react-native-paper';
import {
  SafeAreaView,
  Text,
  View,
  TouchableNativeFeedback,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Avatar, RadioButton } from 'react-native-paper';
import { updateProfile } from 'firebase/auth';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import * as ImagePicker from 'react-native-image-picker';
import { uploadProfilePhoto } from '../firebase/storage';
import { colors } from '../constants';

const ModalEditProfile = () => {
  const user = auth.currentUser;
  const [profilePhoto, setProfilePhoto] = useState(user.photoURL);
  const [displayName, setDisplayName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    const reference = ref(database, 'users/' + user.uid + '/info');
    onValue(reference, snapshot => {
      const data = snapshot.val();
      setEmail(data.email);
      setCountry(data.country);
      setAge(data.age);
      setGender(data.gender);
    });
  }, [user.uid]);

  const save = () => {
    var extra_data = {
      age: age,
      country: country,
      gender: gender,
    };

    auth.onAuthStateChanged(user => {
      updateProfile(user, {
        displayName: displayName,
        email: email,
      })
        .then(() => {
          const reference = ref(database, 'users/' + user.uid + '/info');
          set(reference, extra_data);

          Toast.show({
            type: 'success',
            text1: 'Profile updated!',
            text2: '',
          });
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: error.message,
            text2: '',
          });
        });
    });
  };

  const ProfilePhotoChangedButton = React.useCallback(async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };
    const result = await ImagePicker.launchImageLibrary(options);
    const uri = result?.assets && result.assets[0].uri;
    const base64 = result?.assets && result.assets[0].base64;
    setProfilePhoto(uri);
    await uploadProfilePhoto(base64, user, console.log);
  }, [user]);

  return (
    <View style={styles.mainFrame}>
      <ScrollView>
        <SafeAreaView style={styles.pageContentFrame}>
          <View style={styles.headerUserInfo}>
            <View style={styles.headerUserInfo_avatarFrame}>
              <Avatar.Image
                style={styles.headerUserInfo_avatar}
                source={{ uri: profilePhoto }}
                size={100}
              />
              <TouchableNativeFeedback
                onPress={() => ProfilePhotoChangedButton()}>
                <Avatar.Icon
                  size={35}
                  style={styles.headerUserInfo_profileChangeAvatar}
                  icon="camera"
                />
              </TouchableNativeFeedback>
            </View>

            <View style={styles.headerUserInfo_texts}>
              <Text style={styles.headerUserInfo_nameText}>{displayName}</Text>
              <Text style={styles.headerUserInfo_emailText}>{email}</Text>
            </View>
          </View>

          <View style={[styles.editTextFrame, { marginTop: 100 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.inputText}>Display Name</Text>
            </View>
          </View>

          <View style={styles.editInputFrame}>
            <View style={styles.frameCentered}>
              <TextInput
                outlineColor="#efefef"
                placeholderTextColor={'#2f3030'}
                placeholder={displayName}
                style={styles.input}
                mode="outlined"
                onChangeText={setDisplayName}
              />
            </View>
          </View>

          <View style={[styles.editTextFrame, { marginTop: 20 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.inputText}>Email</Text>
            </View>
          </View>

          <View style={styles.editInputFrame}>
            <View style={styles.frameCentered}>
              <TextInput
                outlineColor="#efefef"
                placeholderTextColor={'#2f3030'}
                placeholder={email}
                style={styles.input}
                mode="outlined"
                onChangeText={setEmail}
                value={email}
              />
            </View>
          </View>

          <View style={styles.editTextFrame}>
            <View style={styles.editRowInputFrame}>
              <View style={styles.editRowInputFrameCentered}>
                <View style={styles.editRowInputView}>
                  <View style={styles.frameCentered}>
                    <Text style={styles.inputText}>City</Text>
                  </View>
                </View>

                <View style={styles.editInputFrame}>
                  <View style={styles.frameCentered}>
                    <TextInput
                      outlineColor="#efefef"
                      placeholderTextColor={'#2f3030'}
                      placeholder={country}
                      style={styles.input}
                      mode="outlined"
                      onChangeText={setCountry}
                    />
                  </View>
                </View>
              </View>

              <View style={styles.editRowWidth}>
                <View style={styles.editRowInputView}>
                  <View style={styles.frameCentered}>
                    <Text style={styles.inputText}>Age</Text>
                  </View>
                </View>

                <View style={styles.editInputFrame}>
                  <View style={styles.frameCentered}>
                    <TextInput
                      outlineColor="#efefef"
                      keyboardType="numeric"
                      maxLength={2}
                      placeholderTextColor={'#2f3030'}
                      placeholder={age}
                      onChangeText={setAge}
                      style={styles.input}
                      mode="outlined"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={[styles.editTextFrame, { marginTop: 20 }]}>
            <View style={styles.frameCentered}>
              <Text style={styles.inputText}>Gender</Text>
            </View>
          </View>

          <View style={styles.genderInputFrame}>
            <View style={styles.genderInputView}>
              <RadioButton.Group
                onValueChange={gender => setGender(gender)}
                value={gender}>
                <RadioButton.Item
                  labelStyle={styles.genderText}
                  label="Male"
                  value="Male"
                />
                <RadioButton.Item
                  labelStyle={styles.genderText}
                  color="pink"
                  label="Female"
                  value="Female"
                />
              </RadioButton.Group>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>

      <View style={styles.bottomButtonFrame}>
        <Button onPress={save} style={styles.bottomButton} mode="contained">
          Save
        </Button>
      </View>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('window').height / 8.5,
    borderBottomWidth: 1,
    borderBottomColor: '#eeee',
  },
  headerBarLeft: {
    width: '15%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  headerBarMiddle: {
    width: '70%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerBarText: {
    paddingBottom: 17,
    color: 'black',
    fontSize: 17,
    // fontFamily: 'Roboto-Regular',
  },
  headerBarRight: {
    width: '15%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  pageContentFrame: {
    backgroundColor: 'white',
    marginTop: 30,
  },
  headerUserInfo: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerUserInfo_avatarFrame: {
    justifyContent: 'center',
    marginTop: 100,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  headerUserInfo_avatar: {
    backgroundColor: '#e0e0e0',
  },
  headerUserInfo_profileChangeAvatar: {
    top: 80,
    position: 'absolute',
  },
  headerUserInfo_texts: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  headerUserInfo_nameText: {
    fontSize: 23,
    // fontFamily: 'Roboto-Regular',
    letterSpacing: 0,
    marginBottom: 5,
  },
  headerUserInfo_emailText: {
    color: '#727987',
    fontSize: 14,
    // fontFamily: 'Roboto-Regular',
    letterSpacing: 0,
  },
  editTextFrame: {
    width: '100%',
    alignItems: 'center',
  },
  frameCentered: {
    width: '85%',
  },
  inputText: {
    marginLeft: 3,
    fontSize: 14.5,
    // fontFamily: 'Roboto-Regular',
    color: '#2f3030',
  },
  editInputFrame: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 50,
  },
  editRowInputFrame: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  editRowInputFrameCentered: {
    width: '50%',
  },
  editRowInputView: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  editRowWidth: {
    width: '50%',
  },
  genderInputFrame: {
    marginTop: 10,
    paddingBottom: 100,
    width: '100%',
    alignItems: 'center',
  },
  genderInputView: {
    borderRadius: 5,
    width: '85%',
    borderWidth: 1,
    borderColor: '#efefef',
  },
  genderText: {
    color: '#2f3030',
  },
  bottomButtonFrame: {
    zIndex: 2,
    bottom: 20,
    position: 'absolute',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomButton: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: colors.profileEditBackground,
  },
});

export default ModalEditProfile;
