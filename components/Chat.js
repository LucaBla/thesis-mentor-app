import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View, Pressable, TextInput, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getChat, postMessage } from '../Api';
import { TokenContext } from '../App';
import ChatCard from './ChatCard';
import FilterOptionsChat from './FilterOptionsChat';
import Message from './Message';

export default function Chat({ route, navigation }) {
  const { chatId } = route.params;

  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeTagsStatus, setActiveTagsStatus] = useState([]);
  const [activeTagsBillingStatus, setActiveTagsBillingStatus] = useState([]);

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  
  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  function sendMessage(){
    postMessage(authToken, newMessage, chatId);
    setNewMessage('');
  }

  useEffect(() => {
    getChat(authToken, setChat, chatId);
  }, []);

  useEffect(() => {
    if(chat === null){
      return;
    }
    setMessages(chat.messages);
    console.log("Chat");
  }, [chat]);

  return (
    <>
      {chat == null ? (
        <View></View>
      ):(
      <View style={styles.chatPage}>
        <View style={styles.topBar}>
          <View style={styles.userInfo}>
            <Image
                style={styles.userImg}
                source={require('../assets/user_img.png')}
            />
            {role === 'Supervisor' ?(
              <Text style={styles.nameText}>{chat.student.first_name} {chat.student.last_name}</Text>
            ):(
              <Text style={styles.nameText}>{chat.supervisor.first_name} {chat.supervisor.last_name}</Text>
            )}
          </View>
          <Ionicons name="ellipsis-horizontal" size={20} color="white" />
        </View>
        <FlatList
          data={messages}
          renderItem={
            ({item}) => 
              <Message messageId={item.user_id} content={item.content}/>
          }
          keyExtractor={item => item.id}
        />
        <View style={styles.bottomBar}>
          <TextInput
            placeholder={'Nachricht...'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            value={newMessage}
            onChangeText={setNewMessage}
            width={'90%'}
            backgroundColor={'#4DA1C7'}
            color={'white'}
            height={'100%'}
            borderRadius={5}
            paddingHorizontal={5}
            multiline={true}
          />
          <Pressable style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="white" />
          </Pressable>
        </View>
      </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  chatPage:{
    backgroundColor: 'white',
    height: '100%',
  },
  filterButton:{
    alignSelf: 'flex-end',
    marginRight: 20
  },
  topBar:{
    backgroundColor: '#0F4D7E',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 20 || 0,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  bottomBar:{
    flexDirection: 'row',
    backgroundColor: '#0F4D7E',
    padding: 5,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    gap: 5,
    maxHeight: 100,
    alignItems: 'center',
  },
  userInfo:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4DA1C7'
  },
  nameText:{
    color: 'white'
  },
  sendButton:{
    backgroundColor: '#67B345',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
    height: 30,
  }
});