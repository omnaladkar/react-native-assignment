import { View, Text } from 'react-native'
import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';



const Stack = createNativeStackNavigator();


export default function MyStack() {
  return (
 <Stack.Navigator>
    <Stack.Screen name="login" component={LoginScreen}/>
    
 </Stack.Navigator>
  )
}