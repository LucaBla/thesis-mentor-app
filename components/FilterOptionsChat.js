import { useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable, FlatList, View, TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getStatuses, getBillingStatuses, getChatsFromText } from '../Api';
import TagCardFilter from './TagCardFilter';

export default function FilterOptionsChat({authToken, 
                                           setShowFilterOptions, activeTagsStatus, setActiveTagsStatus,
                                           activeTagsBillingStatus, setActiveTagsBillingStatus, setChats}){
  const [statuses, setStatuses] = useState([]);
  const [billingStatuses, setBillingStatuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [statusesIsOpen, setStatusesIsOpen] = useState(false);
  const [billingStatusesIsOpen, setBillingStatusesIsOpen] = useState(false);

  function closeFilterOptions(){
    getChatsFromText(authToken, setChats, activeTagsStatus, activeTagsBillingStatus);
    setShowFilterOptions(false);
  }

  function clearActiveTags(){
    setActiveTagsStatus([]);
    setActiveTagsBillingStatus([]);
  }

  useEffect(() => {
    getStatuses(authToken, setStatuses, null);
    getBillingStatuses(authToken, setBillingStatuses, null);
  }, []);

  useEffect(() => {
    getStatuses(authToken, setStatuses, searchQuery);
    getBillingStatuses(authToken, setBillingStatuses, searchQuery);
  }, [searchQuery]);

  return(
    <View>
      <Pressable style={styles.closeButton} onPress={closeFilterOptions}>
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
      <Pressable style={styles.clearButton} onPress={() => clearActiveTags()}>
        <Text style={styles.clearButtonText}>Clear</Text>
      </Pressable>
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
            <TagCardFilter id={item.id} title={item.title} activeTags={activeTagsStatus} setActiveTags={setActiveTagsStatus}/>
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
      }
    </View>
  )
}

const styles = StyleSheet.create({
  tagList:{
    marginHorizontal:20,
  },
  closeButton:{
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