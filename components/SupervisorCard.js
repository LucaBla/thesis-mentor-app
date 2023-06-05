import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, Pressable, FlatList, View, Image } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getSupervisors } from '../Api';
import { TokenContext } from '../App';

export default function SupervisorCard({email, first_name, last_name, tags}){

  return(
    <View style={styles.supervisorCard}>
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
  )
}

const styles = StyleSheet.create({
  ThemesWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: 'grey',
    paddingTop: Constants.statusBarHeight + 20 || 0,
    gap: 20
  },
  supervisorCard: {
    backgroundColor: '#0F4D7E',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flex:1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
  }
});