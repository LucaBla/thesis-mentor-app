import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Pressable, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { logOut } from '../Api';
import { TokenContext } from '../App';
import Themes from './Themes';
import Supervisors from './Supervisors';
import Chats from './Chats';
import Navbar from './Navbar';

export default function Home({navigation}) {
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('themes');

  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  return (
    <View style={styles.homePage} onPress={()=>Keyboard.dismiss()} activeOpacity={1}>
      <StatusBar style="dark" />
      {activeSection === 'supervisors'? (
        <Supervisors/>
      ):(
        <></>
      )}
      {activeSection === 'themes'? (
        <Themes
          navigation={navigation}
        />
      ):(
        <></>
      )}
      {activeSection === 'chats'? (
        <Chats
          navigation={navigation}
        />
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
    </View>
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