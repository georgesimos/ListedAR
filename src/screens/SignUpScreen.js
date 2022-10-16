import React from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Toast } from 'react-native-toast-message';
import { RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import { signup } from '../firebase/auth';
import { setUserInfo } from '../firebase/database';
import { updateProfile } from 'firebase/auth';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [age, setAge] = React.useState();
  const [gender, setGender] = React.useState('Male');

  const [securePassword, setSecurePassword] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const userCredential = await signup(email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
        photoURL:
          gender === 'Male'
            ? 'https://i.ibb.co/dL6cvCB/male.png'
            : 'https://i.ibb.co/27QxHX2/female.png',
      });

      await setUserInfo(user.uid, {
        age: age,
        gender: gender,
        country: country,
      });

      Toast.show({
        type: 'success',
        text1: `Welcome ${name} 👋`,
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
        text2: error.code,
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              style={styles.headerLeftIcon}
              color="black"
              size={25}
              name="chevron-left"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMiddle}>
          <Text style={styles.headerMiddleText}> Sign Up </Text>
        </View>
        <View style={styles.headerMiddleRight} />
      </View>

      <View style={styles.pageContent}>
        <Image
          style={styles.logoImage}
          resizeMode="contain"
          source={require('../assets/listed.png')}
        />

        <View style={styles.inputFrame}>
          <View style={styles.frameCentered}>
            <TextInput
              outlineColor="#efefef"
              left={
                <TextInput.Icon
                  style={styles.textInputIcon}
                  size={20}
                  color="gray"
                  name="account"
                />
              }
              placeholderTextColor={'#2f3030'}
              label="Name"
              style={styles.textInput}
              mode="outlined"
              onChangeText={setName}
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="none"
            />
          </View>
        </View>

        <View style={[styles.inputFrame, { marginTop: 12 }]}>
          <View style={styles.frameCentered}>
            <TextInput
              secureTextEntry={securePassword}
              right={
                <TextInput.Icon
                  style={styles.textInputIcon}
                  onPressIn={() => setSecurePassword(false)}
                  onPressOut={() => setSecurePassword(true)}
                  name="eye"
                />
              }
              outlineColor="#efefef"
              placeholderTextColor={'#2f3030'}
              label="Password"
              keyboardType="default"
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="none"
              style={styles.textInput}
              mode="outlined"
              onChangeText={setPassword}
            />
          </View>
        </View>

        <View style={[styles.inputFrame, { marginTop: 12 }]}>
          <View style={styles.frameCentered}>
            <TextInput
              left={
                <TextInput.Icon
                  style={styles.textInputIcon}
                  size={20}
                  color="gray"
                  name="email"
                />
              }
              outlineColor="#efefef"
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect="none"
              placeholderTextColor={'#2f3030'}
              keyboardType="email-address"
              label="Email"
              style={styles.textInput}
              mode="outlined"
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={[styles.inputFrame, { marginTop: 12 }]}>
          <View style={styles.rowInputFrame}>
            <View style={styles.rowInputFrameWidth}>
              <View style={styles.rowInputWidth}>
                <View style={styles.frameCentered}>
                  <TextInput
                    outlineColor="#efefef"
                    placeholderTextColor={'#2f3030'}
                    label="Country"
                    style={styles.input}
                    mode="outlined"
                    onChangeText={setCountry}
                  />
                </View>
              </View>
            </View>

            <View style={styles.rowInputFrameWidth}>
              <View style={styles.rowInputWidth}>
                <View style={styles.frameCentered}>
                  <TextInput
                    outlineColor="#efefef"
                    keyboardType="numeric"
                    maxLength={2}
                    placeholderTextColor={'#2f3030'}
                    label="Age"
                    style={styles.input}
                    mode="outlined"
                    onChangeText={setAge}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.inputFrame, { marginTop: 12 }]}>
          <View style={styles.frameCentered}>
            <Text style={styles.text}>Gender</Text>
          </View>
        </View>

        <View style={[styles.inputFrame, { marginTop: 12 }]}>
          <View style={styles.genderFrame}>
            <RadioButton.Group
              onValueChange={val => setGender(val)}
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

        <Button
          style={styles.button}
          onPress={handleSignup}
          loading={isLoading}
          mode="outlined">
          Sign Up
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: Dimensions.get('window').height / 8.5,
  },
  headerLeft: {
    width: '15%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  headerLeftIcon: {
    paddingBottom: 15,
  },
  headerMiddle: {
    width: '70%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerMiddleText: {
    paddingBottom: 17,
    color: 'black',
    fontSize: 17,
    // fontFamily: 'Roboto-Regular',
  },
  headerMiddleRight: {
    width: '15%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  pageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoImage: {
    width: '60%',
    height: 50,
    marginBottom: 30,
  },
  inputFrame: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameCentered: {
    width: '85%',
  },
  textInputIcon: {
    marginTop: 14,
  },
  textInput: {
    backgroundColor: 'white',
    height: 50,
  },
  rowInputFrame: {
    width: '92%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowInputFrameWidth: {
    width: '50%',
  },
  rowInputWidth: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowInputFrameCentered: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: 3,
    fontSize: 14.5,
    // fontFamily: 'Roboto-Regular',
    color: '#757575',
  },
  genderFrame: {
    borderRadius: 5,
    width: '85%',
    borderWidth: 1,
    borderColor: '#efefef',
  },
  genderText: {
    color: '#757575',
  },
  button: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    height: 50,
  },
});

export default SignUpScreen;
