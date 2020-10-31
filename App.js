import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './src/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const AppStack = createStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <AppStack.Navigator>
       <AppStack.Screen name=" " component={AssetExample} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}