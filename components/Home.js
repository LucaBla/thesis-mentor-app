import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { logOut } from '../Api';
import { TokenContext } from '../App';
import Themes from './Themes';
import Supervisors from './Supervisors';
import Chats from './Chats';
import Navbar from './Navbar';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('themes');

  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  return (
    <TouchableOpacity style={styles.homePage} onPress={()=>Keyboard.dismiss()} activeOpacity={1}>
      <StatusBar style="light" />
      <Text style={{position:'absolute'}}>{role}</Text>
      {activeSection === 'supervisors'? (
        <Supervisors/>
      ):(
        <></>
      )}
      {activeSection === 'themes'? (
        <Themes/>
      ):(
        <></>
      )}
      {activeSection === 'chats'? (
        <Chats/>
      ):(
        <></>
      )}
      <Navbar 
        activeSection={activeSection}
        setActiveSection={setActiveSection} 
        authToken={authToken} 
        setAuthToken={setAuthToken}
        setLoading={setLoading}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  homePage: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight + 20 || 0,
    gap: 20
  },
});