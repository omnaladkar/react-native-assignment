import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTheme } from '../context/TimeContext';

const ProfileScreen = () => {
  const user = auth().currentUser;
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {user?.displayName}</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
      <View style={styles.themeToggle}>
        <Text style={styles.text}>Dark Mode</Text>
        <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default ProfileScreen;
