import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, Pressable, View, Image } from 'react-native';
import Constants from 'expo-constants';
import { postChat } from '../Api';
import { TokenContext } from '../App';

export default function SupervisorCard({navigation, id, first_name, last_name, tags}){
  const [showContact, setShowContact] = useState(false);
  const [newChatId, setNewChatId] = useState(null);

  const{
    authToken,
  } = useContext(TokenContext);

  function createChat(){
    postChat(authToken, id, 23, setNewChatId);
  }

  useEffect(() => {
    if(newChatId !== null){
      navigation.navigate('Chat', {chatId: newChatId})
    }
  }, [newChatId]);

  return(
    <Pressable style={styles.supervisorCard} onPress={() => setShowContact(!showContact)}>
      <View style={styles.supervisorImgAndInfo}>
        <Image
          style={styles.userImg}
          source={require('../assets/user_img.png')}
        />
        <View style={styles.supervisorInfo}>
          <View style={styles.name}>
            <Text style={styles.nameText}>{first_name}</Text>
            <Text style={styles.nameText}>{last_name}</Text>
          </View>
          <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
            {tags.map(({title}) =>(
              
              <View style={styles.tagCard}>
                <Text style={styles.tagCardText}>{title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      {showContact &&
        <Pressable style={styles.contactButton} onPress={createChat}>
          <Text style={styles.contactButtonText}>Kontakt</Text>
        </Pressable>
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
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
  }
});