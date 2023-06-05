import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { logOut } from '../Api';
import { TokenContext } from '../App';
import ThemesStudent from './ThemesStudent';
import ThemesSupervisor from './ThemesSupervisor';

export default function Themes({navigation}) {

  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  return (
    <View style={styles.ThemesWrapper}>
      {role == 'Student' && 
        <ThemesStudent/>
      }
      {role === 'Supervisor' &&
      <ThemesSupervisor
        navigation={navigation}
      />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  ThemesWrapper: {
    flex: 1,
  }
});

