import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, Pressable, FlatList, View, Image } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getSupervisor } from '../Api';
import { TokenContext } from '../App';
import SupervisorCard from './SupervisorCard';
import FilterOptions from './FilterOptions';
import SupervisorsStudent from './SupervisorsStudent';

export default function SupervisorProfile() {
  const [supervisor, setSupervisor] = useState(null);
  const [showEditTags, setShowEditTags] = useState(false);

  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  useEffect(() => {
    getSupervisor(authToken, setSupervisor, null)
  }, []);

  return (
    <>
    {showEditTags ? (
      <View style={styles.tagEditWrapper}>
        <View style={styles.activeTagsList}>
          <View style={styles.activeTagsListHeader}>
            <Text style={styles.activeTagListTitle}>Eigene Tags:</Text>
            <Pressable onPress={() => setShowEditTags(false)}>
              <Ionicons name="close" size={20} color="white" />
            </Pressable>
          </View>
          <FlatList
            data={supervisor.tags}
            renderItem={
              ({item}) => 
                <View style={styles.tagCardOptions}>
                  <Text style={styles.tagCardText}>{item.title}</Text>
                  <Ionicons name="trash-outline" size={18} color="white" />
                </View>
              }
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.br}></View>
      </View>
    ):(
      <>
      {supervisor ? (
      <View>
        <View style={styles.profileHeader}>
          <Image
            style={styles.userImg}
            source={require('../assets/user_img.png')}
          />
          <View style={styles.supervisorName}>
            <Text style={styles.supervisorNameText}>{supervisor.first_name}</Text>
            <Text style={styles.supervisorNameText}>{supervisor.last_name}</Text>
          </View>
        </View>
        <View style={styles.tagsWrapper}>
          <View style={styles.tagHeader}>
          <Text style={styles.tagLabel}>Tags:</Text>
          <Pressable onPress={() =>setShowEditTags(true)}>
            <Ionicons name="build-outline" size={18} color="white" />
          </Pressable>
          </View>
          <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
              {supervisor.tags.map(({title}) =>(
                
                <View style={styles.tagCard}>
                  <Text style={styles.tagCardText}>{title}</Text>
                </View>
              ))}
          </ScrollView>
        </View>
      </View>
    ):(
      <Text>Loading...</Text>
    )
    }
      </>
    )}
    </>
  );
}

const styles = StyleSheet.create({
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
  supervisorName:{
    flex: 1,
    flexDirection: 'row',
    gap: 5,
  },
  supervisorNameText:{
    color: 'white',
    fontSize: 18,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4DA1C7'
  },
  tagsWrapper:{
    backgroundColor: '#0F4D7E',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tagHeader:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tagLabel:{
    color: 'white',
    marginBottom: 5,
  },
  tagCard:{
    backgroundColor: '#4DA1C7',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  activeTagsList:{
    marginHorizontal: 10,
    marginVertical: 10,
  },
  activeTagsListHeader:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  activeTagListTitle:{
    color: 'white',
    fontSize: 16
  },
  tagCardOptions:{
    marginVertical: 5,
    backgroundColor: '#4DA1C7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  tagCardText:{
    fontSize: 14,
    color: 'white'
  },
  tagEditWrapper:{
    flex: 1,
    backgroundColor:'#0F4D7E',
    marginBottom: 100,
    borderRadius: 10,
    marginHorizontal: 10
  },
  br:{
    borderBottomWidth: 3,
    borderColor: 'white',
    marginHorizontal: 40
  }
});