import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, FlatList, View, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getChats } from '../Api';
import { TokenContext } from '../App';
import ChatCard from './ChatCard';
import FilterOptionsChat from './FilterOptionsChat';
import { useFocusEffect } from '@react-navigation/native';


export default function Chats({navigation}) {
  const [chats, setChats] = useState([]);
  const [activeTagsStatus, setActiveTagsStatus] = useState([]);
  const [activeTagsBillingStatus, setActiveTagsBillingStatus] = useState([]);

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  
  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  // useEffect(() => {
  //   getChats(authToken, setChats);
  // }, []);

  useFocusEffect(
    useCallback(() => {
      getChats(authToken, setChats);
    }, [])
  );

  return (
    <>
    {showFilterOptions == true ? (
      <FilterOptionsChat
        authToken={authToken} 
        setShowFilterOptions={setShowFilterOptions} 
        activeTagsStatus={activeTagsStatus}
        setActiveTagsStatus={setActiveTagsStatus}
        activeTagsBillingStatus={activeTagsBillingStatus}
        setActiveTagsBillingStatus={setActiveTagsBillingStatus}
        setChats={setChats}
      />
    ):(
      <View>
        <Pressable style={styles.filterButton} onPress={() => setShowFilterOptions(true)}>
          <Ionicons name="filter" size={20} color="black" />
        </Pressable>
        <View style={styles.supervisorList}>
          <FlatList
            data={chats}
            renderItem={
              ({item}) => 
              <ChatCard 
                id={item.id}
                theme={item.theme} 
                status={item.status} 
                billingStatus={item.billing_status}
                student={item.student}
                supervisor={item.supervisor}
                navigation={navigation}
              />
            }
            keyExtractor={item => item.id}
          />
        </View>
      </View>
        )
        }
  </>
  );
}

const styles = StyleSheet.create({
  ThemesWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: 'green',
    paddingTop: Constants.statusBarHeight + 20 || 0,
    gap: 20
  },
  supervisorList:{
    paddingBottom: 120
  },
  filterButton:{
    alignSelf: 'flex-end',
    marginRight: 20
  },
});