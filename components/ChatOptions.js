import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, FlatList, View, Pressable, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getStatuses, putChat } from '../Api';
import { TokenContext } from '../App';
import ChatCard from './ChatCard';
import FilterOptionsChat from './FilterOptionsChat';
import { useFocusEffect } from '@react-navigation/native';
import TagCardChatOptions from './TagCardChatOptions';


export default function ChatOptions({setOptionsVisible, activeStatus, chatId, setActiveStatus}) {
  const [statuses, setStatuses] = useState([]);
  const [activeTagStatus, setActiveTagStatus] = useState(activeStatus);
  const [activeTagsBillingStatus, setActiveTagsBillingStatus] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [statusesIsOpen, setStatusesIsOpen] = useState(false);
  
  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  function closeChatOptions(){
    putChat(authToken, chatId, activeTagStatus);
    setActiveStatus(activeTagStatus);
    setOptionsVisible(false)
  }

  useEffect(() => {
    getStatuses(authToken, setStatuses, null);
    //getBillingStatuses(authToken, setBillingStatuses, null);
  }, []);

  useEffect(() => {
    getStatuses(authToken, setStatuses, searchQuery);
    //getBillingStatuses(authToken, setBillingStatuses, searchQuery);
  }, [searchQuery]);

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
      {/* <Pressable style={styles.statusHeader} onPress={() => setBillingStatusesIsOpen(!billingStatusesIsOpen)}>
        <Text style={styles.statusHeaderText}>Rechnungsstatus</Text>
        {billingStatusesIsOpen ? (
          <Ionicons name="chevron-up" size={20} color="black" />
        ):(
          <Ionicons name="chevron-down" size={20} color="black" />
        )}
      </Pressable>
      {billingStatusesIsOpen ? (
        <FlatList
          style={styles.tagList}
          data={billingStatuses}
          renderItem={
            ({item}) => 
            <TagCardFilter id={item.id} title={item.title} activeTags={activeTagsBillingStatus} setActiveTags={setActiveTagsBillingStatus}/>
          }
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
        />
      ):(
        <></>
      )
      } */}
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
  }
});