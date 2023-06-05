import { StyleSheet, Text, View } from 'react-native';
import LogIn from './components/LogIn';
import Home from './components/Home';
import { createContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { validateToken, getRole } from './Api';
import * as SecureStore from 'expo-secure-store';
import CreateTheme from './components/CreateTheme';

export const TokenContext = createContext(null);

const Stack = createNativeStackNavigator();

export default function App() {
  const [authToken, setAuthToken] = useState('');
  const [isValidAuthToken, setIsValidAuthToken] = useState(true);
  const [role, setRole] = useState('');

  const getToken = async () =>{
    try {
      //const token = await SecureStore.getItemAsync('authToken');
      const token = await SecureStore.getItemAsync('authToken');
      if (token) {
        // Verwenden Sie den JWT-Token für API-Anforderungen
        console.log('token found');
        setAuthToken(token);
      }
      else{
        console.log('no Token found');
        setAuthToken(null);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
     validateToken(authToken, setIsValidAuthToken);
     getRole(authToken, setRole);
  }, [authToken]);

  return (
    <TokenContext.Provider value={{authToken, setAuthToken, role, setRole}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isValidAuthToken? (
          <>
            <Stack.Screen name="Topics" component={Home}/> 
            <Stack.Screen name="CreateTheme" component={CreateTheme}/> 
          </>
        ):(
          <Stack.Screen name="LogIn" component={LogIn}/> 
        )}
        </Stack.Navigator>
      </NavigationContainer>
    </TokenContext.Provider>
   
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
