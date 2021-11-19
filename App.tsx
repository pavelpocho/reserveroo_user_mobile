import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ReservationContextProvider } from './src/contexts/reservation-context';
import RootStackParamList from './src/root-stack-param-list/root-stack-param-list';
import PlaceDetail from './src/screens/place-detail';
import PlaceList from './src/screens/place-list';
import PlaceReservation from './src/screens/place-reservation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ReservationContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PlaceList">
            <Stack.Screen name="PlaceList" component={PlaceList} options={{ title: "Seznam míst" }} />
            <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
            <Stack.Screen name="PlaceReservation" component={PlaceReservation} />
        </Stack.Navigator>
      </NavigationContainer>
    </ReservationContextProvider>
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
