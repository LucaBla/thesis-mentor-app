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
      <View style={styles.navBar}>
        <Pressable style={styles.navBarElement} onPress={() => setActiveSection('supervisors')}>
          <Ionicons name="people-outline" size={20} color="white" />
          <Text style={styles.navBarText}>Betreuer</Text>
        </Pressable>
        <Pressable style={styles.navBarElement} onPress={() => setActiveSection('themes')}>
          <Ionicons name="book-outline" size={20} color="white" />
          <Text style={styles.navBarText}>Themen</Text>
        </Pressable>
        <Pressable style={styles.navBarElement} onPress={() => setActiveSection('chats')}>
          <Ionicons name="chatbubble-outline" size={20} color="white" />
          <Text style={styles.navBarText}>Chats</Text>
        </Pressable>
        <Pressable style={styles.navBarElement} onPress={() => logOut(authToken, setAuthToken, setLoading)}>
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text style={styles.navBarText}>LogOut</Text>
        </Pressable>
      </View>
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
  navBar:{
    backgroundColor: '#0F4D7E',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navBarText:{
    color: 'white',
  },
  navBarElement:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});