import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable, FlatList, View } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons'; 
import {  removeTagsFromSupervisor, addTagsFromSupervisor } from '../Api';
import { TokenContext } from '../App';

export default function EditTags({tags, supervisor, setSupervisor, closeEditTags}) {
  const [filteredTags, setFilteredTags] = useState([]);

  const [selectedNewTags, setSelectedNewTags] = useState([]);
  const [tagsToRemove, setTagsToRemove] = useState([]);

  const{
    authToken,
  } = useContext(TokenContext);

  function filterTags(){
    const filtered = tags.filter(tag1 => !supervisor.tags.some(tag2 => tag2.id === tag1.id));
    setFilteredTags(filtered);
  };

  function toggleSelectedNewTags(tag){
    if(selectedNewTags.includes(tag)){
      setSelectedNewTags(selectedNewTags.filter(item => item !== tag));
    }else{
      setSelectedNewTags(prevItems => [...prevItems, tag]);
    }
  };

  function toggleRemoveTag(tag){
    if(tagsToRemove.includes(tag)){
      setTagsToRemove(tagsToRemove.filter(item => item !== tag));
    }else{
      setTagsToRemove(prevItems => [...prevItems, tag]);
    }
  }

  function processEditTags(){
    if(tagsToRemove.length >0){
      removeTagsFromSupervisor(authToken, setSupervisor, tagsToRemove.map(obj => obj.id))
    }
    if(selectedNewTags.length >0){
      addTagsFromSupervisor(authToken, setSupervisor, selectedNewTags.map(obj => obj.id))
    }
    closeEditTags();
  }

  useEffect(() => {
    if(tags != [] && supervisor != null){
      filterTags();
    }
  }, [tags, supervisor]);

  return(
    <View style={styles.tagEditWrapper}>
        <View style={styles.activeTagsList}>
          <View style={styles.activeTagsListHeader}>
            <Text style={styles.activeTagListTitle}>Eigene Tags:</Text>
            <View style={{flexDirection: 'row', gap: 5}}>
              <Pressable onPress={() => closeEditTags()}>
                <Ionicons name="close" size={20} color="white" />
              </Pressable>
              <Pressable onPress={() => processEditTags()}>
                <Ionicons name="checkmark" size={20} color="white" />
              </Pressable>
            </View>
          </View>
          <FlatList
            data={supervisor.tags}
            renderItem={
              ({item}) => 
                <View style={[styles.tagCardOptions,
                    tagsToRemove.some(tag=> tag.id === item.id) ? styles.tagToDelete : null ]}>
                  <Text style={styles.tagCardText}>{item.title}</Text>
                  <Pressable onPress={() => toggleRemoveTag(item)}>
                    <Ionicons name="trash-outline" size={18} color="white" />
                  </Pressable>
                </View>
              }
            keyExtractor={item => item.id}
          />
        </View>
        <View style={styles.br}></View>
        <View style={styles.allTagsList}>
          <FlatList
            data={filteredTags}
            renderItem={
              ({item}) => 
                <Pressable style={styles.tagCardOptions} onPress={() => toggleSelectedNewTags(item)}>
                  <Text style={styles.tagCardText}>{item.title}</Text>
                  {selectedNewTags.some(tag=> tag.id === item.id) ? (
                    <Ionicons name="checkmark" size={18} color="rgba(255,255,255, 1)" />
                  ):(
                    <Ionicons name="checkmark" size={18} color="rgba(255,255,255, 0.3)" />

                  )}
                </Pressable>
            }
            keyExtractor={item => item.id}
          />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
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
  },
  allTagsList:{
    marginHorizontal: 10,
    marginVertical: 10,
  },
  tagToDelete:{
    backgroundColor: 'red'
  }
});