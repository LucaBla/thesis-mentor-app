import { StatusBar } from 'expo-status-bar';
import { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { logOut } from '../Api';
import { TokenContext } from '../App';
import { getThemes } from '../Api';
import ThemesStudent from './ThemesStudent';
import MyThemes from './MyThemes';

export default function ThemesSupervisor({navigation}) {
  const [showAll, setShowAll] = useState(false);

  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  return (
    <>
      <View style={styles.themeSelector}>
        <Pressable style={showAll? styles.active : styles.notActive} onPress={()=> setShowAll(true)}>
          <Text style={styles.themeSelectorText}>Alle</Text>
        </Pressable>
        <Pressable style={!showAll? styles.active : styles.notActive} onPress={()=> setShowAll(false)}>
          <Text style={styles.themeSelectorText}>Eigene</Text>
        </Pressable>
      </View>
      {showAll ? (
        <ThemesStudent/>
      ):(
        <MyThemes
          navigation={navigation}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  themesWrapper:{
   
  },
  themeSelector:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0F4D7E',
  },
  themeSelectorText:{
    color: 'white'
  },
  themesList: {
    paddingVertical: -20
  },
  filterButton:{
    alignSelf: 'flex-end',
    marginRight: 20
  },
  notActive:{
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  active:{
    paddingVertical: 10,
    backgroundColor: '#15609B',
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});