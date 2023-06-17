import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View, Pressable, TextInput, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getChat } from '../Api';
import { TokenContext } from '../App';
import ChatCard from './ChatCard';
import FilterOptionsChat from './FilterOptionsChat';

export default function Message({ content, messageId }) {

  const{
    authToken,
    setAuthToken,
    role,
    userId
  } = useContext(TokenContext);

  return (
    <>
    {userId === messageId ?(
      <View style={styles.myMessage}><Text style={styles.messageText}>{content}</Text></View>
    ):(
      <View style={styles.yourMessage}><Text style={styles.messageText}>{content}</Text></View>
    )
    }
    </>
  );
}

const styles = StyleSheet.create({
  myMessage:{
    backgroundColor: '#4DA1C7',
    alignSelf: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    minWidth: '20%',
    maxWidth: '90%',

  },
  yourMessage:{
    backgroundColor: '#4DA1C7',
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    minWidth: '20%',
    maxWidth: '90%',
  },
  messageText:{
    color: 'white',
  }
});