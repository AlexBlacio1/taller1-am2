import React from 'react';
import { LogBox } from 'react-native';
import AppNavigator from './navigation/AppNavigator';


LogBox.ignoreLogs(['Setting a timer', 'AsyncStorage has been extracted']);

export default function App() {
  return <AppNavigator/>
}
