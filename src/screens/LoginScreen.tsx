import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet, Text } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';

GoogleSignin.configure({
  webClientId: 'YOUR_WEB_CLIENT_ID',
});

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onGoogleButtonPress = async () => {
    setLoading(true);
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      Toast.show({
        type: 'success',
        text1: 'Signed in with Google',
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithPhoneNumber = async () => {
    setLoading(true);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmCode = async () => {
    setLoading(true);
    try {
      await confirm.confirm(code);
      Toast.show({
        type: 'success',
        text1: 'Phone number verified',
      });
    } catch (error) {
      setError('Invalid code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Google Sign-In" onPress={onGoogleButtonPress} disabled={loading} />
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
        autoCompleteType="tel"
      />
      <Button title="Send OTP" onPress={signInWithPhoneNumber} disabled={loading} />
      {confirm && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Confirmation Code"
            onChangeText={(text) => setCode(text)}
            keyboardType="number-pad"
            autoCompleteType="tel"
          />
          <Button title="Confirm Code" onPress={confirmCode} disabled={loading} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  error: {
    color: 'red',
  },
});

export default LoginScreen;
