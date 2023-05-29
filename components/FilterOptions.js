import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, Pressable, FlatList, View, Image } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getTags } from '../Api';
import { TokenContext } from '../App';
import TagCardFilter from './TagCardFilter';

export default function FilterOptions({authToken, setShowFilterOptions}){
  const [tags, setTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);

  useEffect(() => {
    getTags(authToken, setTags);
  }, []);

  return(
    <View>
      <Pressable style={styles.closeButton} onPress={() => setShowFilterOptions(false)}>
      <Ionicons name="close" size={20} color="black" />
      </Pressable>
      <FlatList
        style={styles.tagList}
        data={tags}
        renderItem={
          ({item}) => 
          <TagCardFilter id={item.id} title={item.title} activeTags={activeTags} setActiveTags={setActiveTags}/>
        }
        ItemSeparatorComponent={() => <View style={{height: 10}} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  tagList:{
    marginHorizontal:20
  },
  tagCard:{
    backgroundColor: '#4DA1C7',
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  tagCardText:{
    color: 'white',
    fontSize: 16
  },
  closeButton:{
    alignSelf: 'flex-end',
    marginRight: 20
  }
});