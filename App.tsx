import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ReservationContextProvider } from './src/contexts/reservation-context';
import { UserContextProvider } from './src/contexts/user-context';
import RootStackParamList from './src/root-stack-param-list/root-stack-param-list';
import PlaceDetail from './src/screens/place-detail';
import PlaceList from './src/screens/place-list';
import PlaceReservation from './src/screens/place-reservation';
import ReservationSummary from './src/screens/reservation-summary';
import UserInfoInput from './src/screens/user-info-input';
import { MaterialIcons } from '@expo/vector-icons';
import MyReservations from './src/screens/my-reservations';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const PlacesStack = () => {
  return (
    <Stack.Navigator initialRouteName="PlaceList">
      <Stack.Screen name="PlaceList" component={PlaceList} options={{ title: "Seznam míst" }} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
      <Stack.Screen name="PlaceReservation" component={PlaceReservation} options={{ title: "Nová rezervace" }} />
      <Stack.Screen name="UserInfoInput" component={UserInfoInput} options={{ title: "Kontaktí informace" }} />
      <Stack.Screen name="ReservationSummary" component={ReservationSummary} options={{ title: "Shrnutí rezervace" }} />
  </Stack.Navigator>
  )
}

export default function App() {
  return (
    <UserContextProvider>
      <ReservationContextProvider>
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Places" screenOptions={{ headerShown: false }}>
            <Tab.Screen 
              name="Places" 
              component={PlacesStack} 
              options={{ tabBarLabel: "Místa", tabBarIcon: ({ color, size }) => <MaterialIcons name='local-activity' size={size} color={color} /> }} 
            />
            <Tab.Screen 
              name="MyReservations"
              component={MyReservations} 
              options={{ tabBarLabel: "Moje rezervace", tabBarIcon: ({ color, size }) => <MaterialIcons name='receipt-long' size={size} color={color} /> }} 
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ReservationContextProvider>
    </UserContextProvider>    
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
