import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, View, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getChats } from '../Api';
import { TokenContext } from '../App';
import ChatCard from './ChatCard';

export default function Chats() {
  const [chats, setChats] = useState([]);

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  
  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  useEffect(() => {
    getChats(authToken, setChats);
  }, []);

  return (
    <>
    {showFilterOptions == true ? (
      <FilterOptions 
        page={'Supervisors'}
        // authToken={authToken} 
        // setShowFilterOptions={setShowFilterOptions} 
        // setSupervisors={setSupervisors}
        // activeTags={activeTags}
        // setActiveTags={setActiveTags}
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
                theme={item.theme} 
                status={item.status} 
                billingStatus={item.billing_status}
                student={item.student}
                supervisor={item.supervisor}
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
  filterButton:{
    alignSelf: 'flex-end',
    marginRight: 20
  },
});