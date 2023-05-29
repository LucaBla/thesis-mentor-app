import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { logOut } from '../Api';
import { TokenContext } from '../App';

export default function Navbar({activeSection, setActiveSection, authToken, setAuthToken, setLoading}) {

  return (
    <View style={styles.navBar}>
      <Pressable style={styles.navBarElement} onPress={() => setActiveSection('supervisors')}>
        {activeSection === 'supervisors' ? (
          <Ionicons name="people" size={20} color="white" />
        ):(

          <Ionicons name="people-outline" size={20} color="white" />
        )
        }
        <Text style={styles.navBarText}>Betreuer</Text>
      </Pressable>
      <Pressable style={styles.navBarElement} onPress={() => setActiveSection('themes')}>
        {activeSection === 'themes' ? (
          <Ionicons name="book" size={20} color="white" />
        ):(

          <Ionicons name="book-outline" size={20} color="white" />
        )
        }
        <Text style={styles.navBarText}>Themen</Text>
      </Pressable>
      <Pressable style={styles.navBarElement} onPress={() => setActiveSection('chats')}>
        {activeSection === 'chats' ? (
          <Ionicons name="chatbubble" size={20} color="white" />
        ):(

          <Ionicons name="chatbubble-outline" size={20} color="white" />
        )
        }
        <Text style={styles.navBarText}>Chats</Text>
      </Pressable>
      <Pressable style={styles.navBarElement} onPress={() => logOut(authToken, setAuthToken, setLoading)}>
        <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={styles.navBarText}>LogOut</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar:{
    backgroundColor: '#0F4D7E',
    bottom: 0,
    position: 'absolute',
    width: '100%',
    paddingVertical: 20,
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