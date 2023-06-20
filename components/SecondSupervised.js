import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, Pressable, FlatList, View, Image } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { postChat, getSecondChats } from '../Api';
import { TokenContext } from '../App';
import ChatCard from './ChatCard';

export default function SecondSupervised({navigation, id, email, first_name, last_name, tags}){
  const [secondChats, setSecondChats] = useState([]);
  const [newChatId, setNewChatId] = useState(null);

  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  function createChat(){
    postChat(authToken, id, 23, setNewChatId);
  }

  useEffect(() => {
    getSecondChats(authToken, setSecondChats)
  }, []);

  useEffect(() => {
    if(newChatId !== null){
      navigation.navigate('Chat', {chatId: newChatId})
    }
  }, [newChatId]);

  return(
    <View style={styles.ThemesWrapper}>
      <View style={styles.profileHeader}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </Pressable>
        <Text  style={styles.profileHeaderText}>Zweitprüfer Arbeiten</Text>
      </View>
      <View style={styles.thesisList}>
        <FlatList
          data={secondChats}
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
              secondSupervisedPage={true}
            />
          }
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ThemesWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight + 20 || 0,
    gap: 20
  },
  profileHeader: {
    width: '100%',
    backgroundColor: '#0F4D7E',
    marginTop: -(Constants.statusBarHeight + 20),
    paddingTop: Constants.statusBarHeight + 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileHeaderText:{
    color: 'white',
    fontSize: 18
  },
  supervisorCard: {
    backgroundColor: '#0F4D7E',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    gap: 10
  },
  supervisorImgAndInfo:{
    flexDirection: 'row',
    gap: 10
  },
  supervisorInfo:{
    flex: 1,
    gap: 5
  },
  name:{
    flex: 1,
    flexDirection: 'row',
    gap: 5
  },
  nameText: {
    fontSize: 16,
    color: 'white',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4DA1C7'
  },
  tagCard:{
    backgroundColor: '#4DA1C7',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  tagCardText:{
    fontSize: 12,
    color: 'white'
  },
  contactButton:{
    marginTop: 10,
    backgroundColor: '#67B345',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: '100%'
  },
  contactButtonText:{
    color: 'white',
    fontSize: 14,
    textAlign: 'center'
  },
  thesisList:{
    // paddingBottom: 120
  },
});