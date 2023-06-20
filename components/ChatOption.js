import { useState } from 'react';
import { StyleSheet, Text, FlatList, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import Constants from 'expo-constants';
import TagCardChatOptions from './TagCardChatOptions';

export default function ChatOption({title, items, activeTag, setActiveTag}) {
  const [isOpen, setIsOpen] = useState(false);

  return(
    <>
      <Pressable style={styles.statusHeader} onPress={() => setIsOpen(!isOpen)}>
          <Text style={styles.statusHeaderText}>{title}</Text>
          {isOpen ? (
            <Ionicons name="chevron-up" size={20} color="black" />
          ):(
            <Ionicons name="chevron-down" size={20} color="black" />
          )}
        </Pressable>
        {isOpen ? (
          <>
            <FlatList
            style={styles.tagList}
            data={items}
            renderItem={
              ({item}) => 
              <TagCardChatOptions
                id={item.id} 
                title={item.title? item.title : item.first_name + ' '+ item.last_name} 
                activeTag={activeTag} 
                setActiveTag={setActiveTag}
              />
            }
            ItemSeparatorComponent={() => <View style={{height: 10}} />}
          />
          <View style={styles.bR}></View>
          </>
        ):(
          <></>
        )}
    </>
  )
 }

 const styles = StyleSheet.create({
  tagList:{
    marginHorizontal:20,
  },
  statusHeader:{
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  statusHeaderText:{
    fontSize: 16,
  },
  bR:{
    borderBottomWidth: 2,
    borderBottomColor: '#4DA1C7',
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center'
  },
});