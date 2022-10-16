import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { login } from '../firebase/auth';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {
  const [securePassword, setSecurePassword] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await login(email, password);
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
    <SafeAreaView style={styles.mainFrame}>
      <Toast />
      <View style={styles.mainFrameCentered}>
        <View style={styles.logo}>
          <Image
            style={{ width: '60%', height: 50 }}
            resizeMode="contain"
            source={require('../assets/listed.png')}
          />
        </View>

        <TextInput
          autoCapitalize="none"
          placeholderTextColor={'#2f3030'}
          mode="outlined"
          label="Email"
          style={styles.input}
          onChangeText={setEmail}
          outlineColor="#efefef"
        />
        <TextInput
          secureTextEntry={securePassword}
          placeholderTextColor={'#2f3030'}
          right={
            <TextInput.Icon
              onPressIn={() => setSecurePassword(false)}
              onPressOut={() => setSecurePassword(true)}
              name="eye"
            />
          }
          autoCapitalize="none"
          outlineColor="#efefef"
          mode="outlined"
          label="Password"
          style={styles.input}
          onChangeText={setPassword}
        />

        <Button onPress={handleLogin} loading={isLoading} mode="outlined">
          Log In
        </Button>

        <View style={styles.bottomTextFrame}>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.bottomText}> Sign Up </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainFrame: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainFrameCentered: {
    width: '80%',
  },
  logo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  bottomTextFrame: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    // fontFamily: 'Roboto-Light',
    letterSpacing: 0.3,
  },
});

export default LoginScreen;
