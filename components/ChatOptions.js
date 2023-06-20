import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, FlatList, View, Pressable, TextInput, Alert } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getStatuses, getBillingStatuses, putChat, getMyThemes, deleteChat, getSupervisors } from '../Api';
import { TokenContext } from '../App';
import ChatCard from './ChatCard';
import FilterOptionsChat from './FilterOptionsChat';
import { useFocusEffect } from '@react-navigation/native';
import TagCardChatOptions from './TagCardChatOptions';


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

  const [statusesIsOpen, setStatusesIsOpen] = useState(false);
  const [billingStatusesIsOpen, setBillingStatusesIsOpen] = useState(false);
  const [themeIsOpen, setThemeIsOpen] = useState(false);
  const [secondSupervisorIsOpen, setSecondSupervisorIsOpen] = useState(false);

  const{
    authToken,
    setAuthToken,
    role
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
    //getMyThemes(authToken, setThemes);
    //getSupervisors(authToken, setSupervisors)
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
      <Pressable style={styles.statusHeader} onPress={() => setStatusesIsOpen(!statusesIsOpen)}>
        <Text style={styles.statusHeaderText}>Status</Text>
        {statusesIsOpen ? (
          <Ionicons name="chevron-up" size={20} color="black" />
        ):(
          <Ionicons name="chevron-down" size={20} color="black" />
        )}
      </Pressable>
      {statusesIsOpen ? (
        <>
          <FlatList
          style={styles.tagList}
          data={statuses}
          renderItem={
            ({item}) => 
            <TagCardChatOptions
              id={item.id} 
              title={item.title} 
              activeTag={activeTagStatus} 
              setActiveTag={setActiveTagStatus}
            />
          }
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
        />
        <View style={styles.bR}></View>
        </>
      ):(
        <></>
      )}
      <Pressable style={styles.statusHeader} onPress={() => setBillingStatusesIsOpen(!billingStatusesIsOpen)}>
        <Text style={styles.statusHeaderText}>Rechnungsstatus</Text>
        {billingStatusesIsOpen ? (
          <Ionicons name="chevron-up" size={20} color="black" />
        ):(
          <Ionicons name="chevron-down" size={20} color="black" />
        )}
      </Pressable>
      {billingStatusesIsOpen ? (
        <>
          <FlatList
            style={styles.tagList}
            data={billingStatuses}
            renderItem={
              ({item}) => 
                <TagCardChatOptions
                  id={item.id} 
                  title={item.title} 
                  activeTag={activeTagBillingStatus} 
                  setActiveTag={setActiveTagBillingStatus}
                />
            }
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />
          <View style={styles.bR}></View>
        </>
      ):(
        <></>
      )
      }
      <Pressable style={styles.statusHeader} onPress={() => setThemeIsOpen(!themeIsOpen)}>
        <Text style={styles.statusHeaderText}>Thema</Text>
        {themeIsOpen ? (
          <Ionicons name="chevron-up" size={20} color="black" />
        ):(
          <Ionicons name="chevron-down" size={20} color="black" />
        )}
      </Pressable>
      {themeIsOpen ? (
        <>
          <FlatList
            style={styles.tagList}
            data={themes}
            renderItem={
              ({item}) => 
                <TagCardChatOptions
                  id={item.id} 
                  title={item.title} 
                  activeTag={activeTagTheme} 
                  setActiveTag={setActiveTagTheme}
                />
            }
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />
          <View style={styles.bR}></View>
        </>
      ):(
        <></>
      )
      }
      <Pressable style={styles.statusHeader} onPress={() => setSecondSupervisorIsOpen(!secondSupervisorIsOpen)}>
        <Text style={styles.statusHeaderText}>Zweitprüfer</Text>
        {secondSupervisorIsOpen ? (
          <Ionicons name="chevron-up" size={20} color="black" />
        ):(
          <Ionicons name="chevron-down" size={20} color="black" />
        )}
      </Pressable>
      {secondSupervisorIsOpen ? (
        <>
          <FlatList
            style={styles.tagList}
            data={supervisors}
            renderItem={
              ({item}) => 
                <TagCardChatOptions
                  id={item.id} 
                  title={item.first_name + ' '+ item.last_name} 
                  activeTag={activeTagSupervisor} 
                  setActiveTag={setActiveTagSupervisor}
                />
            }
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />
          <View style={styles.bR}></View>
        </>
      ):(
        <></>
      )
      }
      <Pressable style={styles.deleteButton} onPress={deleteAlert}>
        <Ionicons name="trash-bin" size={24} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tagList:{
    marginHorizontal:20,
  },
  tagCardText:{
    color: 'white',
    fontSize: 16
  },
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
  clearButton:{
    alignSelf: 'center',
    marginBottom: 20,
  },
  clearButtonText:{
    color: 'rgba(0,0,0, 0.5)'
  },
  statusHeader:{
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  statusHeaderText:{
    fontSize: 16,
  },
  bR:{
    borderBottomWidth: 2,
    borderBottomColor: '#4DA1C7',
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center'
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