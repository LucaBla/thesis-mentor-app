import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, Pressable, FlatList, View, Image } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getTags } from '../Api';
import { TokenContext } from '../App';

export default function tagCardFilter({title, id, setActiveTags, activeTags}){
  const [isActive, setIsActive] = useState(false);

  function activateTag(){
    if(isActive){
      setIsActive(!isActive);
      setActiveTags(prevData => prevData.filter(item => item !== id));
    }
    else{
      setIsActive(!isActive);
      setActiveTags(prevData => [...prevData, id]);
    }
  }

  return(
    <Pressable onPress={activateTag}
            style={[styles.tagCard, isActive ? styles.tagCardActive : null]}
          >
            <Text style={styles.tagCardText}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tagCard:{
    backgroundColor: '#B34545',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  tagCardActive:{
    backgroundColor: '#67B345',
  },
  tagCardText:{
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});