import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Onboarding from './screens/Onboarding';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './screens/Profile';
import Splash from './screens/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, } from 'react';
import HomeScreen from './screens/HomeScreen';




const Stack = createNativeStackNavigator();

export default function App() {

  const [storage, setStorage] = useState({})

  useEffect(() => {
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('profileData')
        setStorage(jsonValue != null ? JSON.parse(jsonValue) : null)
      } catch (e) { }
    })()
  }, []);

  // if (storage.isLoading) {
  //   // We haven't finished reading from AsyncStorage yet
  //   return <SplashScreen />;
  // } else {
  //   // storage.check_email ? (
  //   <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
  //   // ) : (

  //   // <Stack.Screen options={{ headerShown: false }} name="Onboarding" component={Onboarding} />
  //   // )
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {storage?.check_email ? (
          <>
            <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
          </>
        ) : (
          <>
            <Stack.Screen options={{ headerShown: false }} name="Onboarding" component={Onboarding} />
            <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer >
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
