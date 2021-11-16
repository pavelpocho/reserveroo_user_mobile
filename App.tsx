import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PlaceDetail from './src/screens/place-detail';
import PlaceList from './src/screens/place-list';
import PlaceReservation from './src/screens/place-reservation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PlaceList">
          <Stack.Screen name="PlaceList" component={PlaceList} />
          <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
          <Stack.Screen name="PlaceReservation" component={PlaceReservation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
