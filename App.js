import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/LogIn';
import { createContext, useState } from 'react';

export const TokenContext = createContext(null);

export default function App() {
  const [authToken, setAuthToken] = useState('');
  return (
    <TokenContext.Provider value={{authToken, setAuthToken}}>
      <Login/>
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
