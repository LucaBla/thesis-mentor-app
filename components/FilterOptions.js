import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, Pressable, FlatList, View, Image, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getTags } from '../Api';
import { TokenContext } from '../App';
import TagCardFilter from './TagCardFilter';

export default function FilterOptions({authToken, setShowFilterOptions}){
  const [tags, setTags] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getTags(authToken, setTags, null);
  }, []);

  useEffect(() => {
    getTags(authToken, setTags, searchQuery);
  }, [searchQuery]);

  return(
    <View>
      <Pressable style={styles.closeButton} onPress={() => setShowFilterOptions(false)}>
        <Ionicons name="close" size={20} color="black" />
      </Pressable>
      <TextInput
        style={styles.textInput} 
        placeholder='search...' 
        placeholderTextColor='rgba(255,255,255, 0.5)'
        onSubmitEditing={Keyboard.dismiss}
        onChangeText={setSearchQuery}
        value={searchQuery}            
      />
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
    marginHorizontal:20,
  },
  tagCardText:{
    color: 'white',
    fontSize: 16
  },
  closeButton:{
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 20,
  },
  textInput:{
    backgroundColor: '#4DA1C7',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
});