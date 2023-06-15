import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, Pressable, FlatList, View, Image } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getSupervisors } from '../Api';
import { TokenContext } from '../App';

export default function ThemeCard({title, description, tags}){
  const [isOpen, setIsOpen] = useState(false);

  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  return(
    <Pressable style={styles.themeCard} onPress={() => setIsOpen(!isOpen)}>
      <View style={styles.themeInfo}>
        <Image
          style={styles.userImg}
          source={require('../assets/user_img.png')}
        />
        <View style={styles.tagAndTitle}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{title}</Text>
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
      {isOpen &&
        <View style={styles.themeDetails}>
          <Text style={styles.themeDetailsText}>{description}</Text>
          {role !== 'Supervisor' &&
            <Pressable style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Kontakt</Text>
            </Pressable>
          }
        </View>
      }
    </Pressable>
  )
}

const styles = StyleSheet.create({
  themeCard: {
    backgroundColor: '#0F4D7E',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10
  },
  themeInfo:{
    flex: 1,
    gap: 10,
    flexDirection: 'row'
  },
  tagAndTitle:{
    flex: 1,
    gap: 5,
  },
  title:{
    flex: 1,
    flexDirection: 'row',
    gap: 5
  },
  titleText: {
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
  themeDetails:{
    alignSelf: 'flex-start',
    width: '100%'
  },
  themeDetailsText:{
    color: 'white',
    fontSize: 14,
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