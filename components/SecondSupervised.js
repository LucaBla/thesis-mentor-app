import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable, FlatList, View } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons'; 
import { postChat, getSecondChats } from '../Api';
import { TokenContext } from '../App';
import ChatCard from './ChatCard';

export default function SecondSupervised({navigation, id}){
  const [secondChats, setSecondChats] = useState([]);

  const{
    authToken,
  } = useContext(TokenContext);

  useEffect(() => {
    getSecondChats(authToken, setSecondChats)
  }, []);


  return(
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </Pressable>
        <Text  style={styles.headerText}>Zweitprüfer Arbeiten</Text>
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
  wrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: Constants.statusBarHeight + 20 || 0,
    gap: 20
  },
  header: {
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
  headerText:{
    color: 'white',
    fontSize: 18
  },
});