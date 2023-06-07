import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, Pressable, FlatList, View, Image, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getTags, getSupervisorFromText, getThemeFromText, getMyThemeFromText } from '../Api';
import TagCardFilter from './TagCardFilter';

export default function FilterOptions({page, authToken, setShowFilterOptions, setSupervisors, setThemes, activeTags, setActiveTags, setNewThemeTags}){
  const [tags, setTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  function closeFilterOptions(){
    if(page == "Supervisors"){
      getSupervisorFromText(authToken, setSupervisors, activeTags);
      setShowFilterOptions(false);
    }
    if(page == "Themes"){
      getThemeFromText(authToken, setThemes, activeTags);
      setShowFilterOptions(false);
    }
    if(page == "MyThemes"){
      getMyThemeFromText(authToken, setThemes, activeTags);
      setShowFilterOptions(false);
    }
    if(page == "CreateTheme"){
      const newThemeTags = tags.filter(function(tag) {
        return activeTags.includes(tag.id);
      });
      setNewThemeTags(newThemeTags);
      setShowFilterOptions(false);
    }
  }

  useEffect(() => {
    getTags(authToken, setTags, null);
  }, []);

  useEffect(() => {
    getTags(authToken, setTags, searchQuery);
  }, [searchQuery]);

  return(
    <View>
      <Pressable style={styles.closeButton} onPress={closeFilterOptions}>
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
      <Pressable style={styles.clearButton} onPress={() => setActiveTags([])}>
        <Text style={styles.clearButtonText}>Clear</Text>
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
  clearButton:{
    alignSelf: 'center',
    marginBottom: 20,
  },
  clearButtonText:{
    color: 'rgba(0,0,0, 0.5)'
  },
});