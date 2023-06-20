import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getStatuses, getBillingStatuses, putChat, getMyThemes, deleteChat, getSupervisors } from '../Api';
import { TokenContext } from '../App';
import ChatOption from './ChatOption';


export default function ChatOptions({navigation, setOptionsVisible, activeStatus, chatId, setActiveStatus, 
                                     activeBillingStatus, setActiveBillingStatus, activeTheme, setActiveTheme
                                    ,activeSecondSupervisor, setActiveSecondSupervisor}) {
  const [statuses, setStatuses] = useState([]);
  const [billingStatuses, setBillingStatuses] = useState([]);
  const [themes, setThemes] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  const [activeTagStatus, setActiveTagStatus] = useState(activeStatus);
  const [activeTagBillingStatus, setActiveTagBillingStatus] = useState(activeBillingStatus);
  const [activeTagTheme, setActiveTagTheme] = useState(activeTheme);
  const [activeTagSupervisor, setActiveTagSupervisor] = useState(activeSecondSupervisor);

  const [searchQuery, setSearchQuery] = useState('');

  const{
    authToken,
  } = useContext(TokenContext);

  function closeChatOptions(){
    putChat(authToken, chatId, activeTagStatus, activeTagBillingStatus, activeTagTheme, activeTagSupervisor);
    setActiveStatus(activeTagStatus);
    setActiveBillingStatus(activeTagBillingStatus);
    setActiveTheme(activeTagTheme);
    setActiveSecondSupervisor(activeTagSupervisor);
    setOptionsVisible(false)
  }

  function deleteChatAndNavigateBack(){
    deleteChat(authToken, chatId);
    navigation.navigate("Topics");
  }

  useEffect(() => {
    getStatuses(authToken, setStatuses, null);
    getBillingStatuses(authToken, setBillingStatuses, null);
    getMyThemes(authToken, setThemes);
    getSupervisors(authToken, setSupervisors)
  }, []);

  useEffect(() => {
    getStatuses(authToken, setStatuses, searchQuery);
    getBillingStatuses(authToken, setBillingStatuses, searchQuery);
    getMyThemes(authToken, setThemes, searchQuery);
    getSupervisors(authToken, setSupervisors, searchQuery)
  }, [searchQuery]);

  const deleteAlert = () =>
    Alert.alert('Chat löschen', 'Möchten sie den Chat wirklich löschen?', [
      {
        text: 'Abbrechen',
        style: 'cancel',
      },
      {text: 'Bestätigen', onPress: () => deleteChatAndNavigateBack()},
    ]);

  return(
    <View>
      <Pressable style={styles.closeButton} onPress={closeChatOptions}>
        <Ionicons name="close" size={20} color="black" />
      </Pressable>
      <TextInput
        style={styles.textInput} 
        placeholder='search...' 
        placeholderTextColor='rgba(255,255,255, 0.5)'
        onSubmitEditing={Keyboard.dismiss}
        onChangeText={setSearchQuery}
        value={searchQuery}         
      />
      <ChatOption
        title='Status'
        items={statuses}
        activeTag={activeTagStatus}
        setActiveTag={setActiveTagStatus}
      />
      <ChatOption
        title='Rechnungsstatus'
        items={billingStatuses}
        activeTag={activeTagBillingStatus}
        setActiveTag={setActiveTagBillingStatus}
      />
      <ChatOption
        title='Thema'
        items={themes}
        activeTag={activeTagTheme}
        setActiveTag={setActiveTagTheme}
      />
      <ChatOption
        title='Zweitprüfer'
        items={supervisors}
        activeTag={activeTagSupervisor}
        setActiveTag={setActiveTagSupervisor}
      />
      <Pressable style={styles.deleteButton} onPress={deleteAlert}>
        <Ionicons name="trash-bin" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton:{
    paddingTop: Constants.statusBarHeight + 20 || 0,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 20,
  },
  textInput:{
    backgroundColor: '#4DA1C7',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  deleteButton:{
    backgroundColor: 'red',
    marginHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    padding: 2
  }
});