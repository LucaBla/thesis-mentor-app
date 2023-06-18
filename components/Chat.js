import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, Image, View, Pressable, TextInput, FlatList, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getChat, postMessage, API_URL } from '../Api';
import { TokenContext } from '../App';
import ChatCard from './ChatCard';
import FilterOptionsChat from './FilterOptionsChat';
import Message from './Message';
import ChatOptions from './ChatOptions';

export default function Chat({ route, navigation }) {
  const { chatId } = route.params;

  const [chat, setChat] = useState(null);
  const [chatStatus, setChatStatus] = useState('');
  const [chatBillingStatus, setChatBillingStatus] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [guid, setGuid] = useState('');

  const [paddingBottom, setPaddingBottom] = useState(5);

  const [optionsVisible, setOptionsVisible] = useState(false);

  const flatListRef = useRef(null);
  
  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  function sendMessage(){
    postMessage(authToken, newMessage, chatId);
    setNewMessage('');
  }

  function scrollToBottom(){
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  useEffect(() => {
    const ws = new WebSocket(`ws://192.168.178.152:3000/cable?chat_id=${chatId}`);
    ws.onopen= () =>{
      console.log("Connected to Websocket server");
      setGuid(Math.random().toString(36).substring(2, 15));
  
      ws.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            id: guid,
            channel: "MessagesChannel",
            chat_id: chatId
          })
        })
      )
    }
  
    ws.onmessage = (e) =>{
      const data = JSON.parse(e.data);
  
      if(data.type === "ping") return;
      if(data.type === "welcome") return;
      if(data.type === "confirm_subscription") return;
  
      const message = data.message;
      setMessages(prevMessages => [message, ...prevMessages]);
      scrollToBottom();
    }
  
    ws.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };
    getChat(authToken, setChat, chatId);

    if(Platform.OS === 'ios'){
      setPaddingBottom(30);
    }

    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardDidShow' : 'keyboardWillShow',
      () => {
        setPaddingBottom(5);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setPaddingBottom(30);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
      ws.close();
    };
  }, []);

  useEffect(() => {
    if(chat === null){
      return;
    }
    setMessages(chat.messages.reverse());
    setChatStatus(chat.status.id);
    setChatBillingStatus(chat.billing_status.id);
  }, [chat]);

  return (
    <>
      {!optionsVisible ? (
        <>
          {chat == null ? (
            <></>
          ):(
          <KeyboardAvoidingView style={styles.chatPage} behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
            <View style={styles.topBar}>
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" size={24} color="white" />
              </Pressable>
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
              <Pressable onPress={() => setOptionsVisible(true)}>
                <Ionicons name="ellipsis-horizontal" size={20} color="white" />
              </Pressable>
            </View>
            <FlatList
              ref={flatListRef}
              data={messages}
              inverted={true}
              marginBottom={Platform.OS === 'ios' ? 40 + paddingBottom : 40}
              renderItem={
                ({item}) => 
                  <Message messageId={item.user_id} content={item.content}/>
              }
              keyExtractor={item => item.id}
            />
            <View style={[styles.bottomBar, {paddingBottom: paddingBottom}]}>
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
          </KeyboardAvoidingView>
          )}
        </>
      ): (
        <ChatOptions
          setOptionsVisible={setOptionsVisible}
          activeStatus={chatStatus}
          setActiveStatus={setChatStatus}
          activeBillingStatus={chatBillingStatus}
          setActiveBillingStatus={setChatBillingStatus}
          chatId={chatId}
        />
      )}
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  chatPage:{
    backgroundColor: 'white',
    height: '100%',
    flex: 1
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
    paddingHorizontal: 5,
    paddingVertical: 5,
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