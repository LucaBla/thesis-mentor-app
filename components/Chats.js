import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { logOut } from '../Api';
import { TokenContext } from '../App';

export default function Chats() {

  return (
    <ScrollView style={styles.ThemesWrapper}>
      <Text>Chat</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ThemesWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: 'green',
    paddingTop: Constants.statusBarHeight + 20 || 0,
    gap: 20
  }
});