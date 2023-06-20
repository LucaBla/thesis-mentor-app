import { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, TextInput } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { TokenContext } from '../App';
import FilterOptions from './FilterOptions';
import { postTheme } from '../Api';

export default function CreateTheme({navigation}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState([]);

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [activeTags, setActiveTags] = useState([]);

  const{
    authToken,
  } = useContext(TokenContext);

  function createTheme(){
    postTheme(authToken, title, description, activeTags);
    navigation.goBack()
  }

  return (
    <View style={styles.wrapper}>
      {showFilterOptions == true ? (
        <FilterOptions 
          page={'CreateTheme'}
          authToken={authToken} 
          setShowFilterOptions={setShowFilterOptions} 
          setNewThemeTags={setTags}
          activeTags={activeTags}
          setActiveTags={setActiveTags}
        />
      ):(
        <View style={{height: '100%'}}>
          <View style={styles.navBar}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => createTheme()}>
              <Ionicons name="save-outline" size={24} color="black" />
            </Pressable>
          </View>
          <ScrollView style={{height: '100%'}}>
            <TextInput 
              style={styles.textInput} 
              placeholder='Thema' 
              placeholderTextColor='rgba(255,255,255, 0.5)'
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={setTitle}
              value={title}            
              inputMode={'text'}
            />
            <TextInput 
              style={styles.textInput} 
              multiline = {true}
              numberOfLines={6}
              placeholder='Beschreibung' 
              placeholderTextColor='rgba(255,255,255, 0.5)'
              onSubmitEditing={Keyboard.dismiss}
              onChangeText={setDescription}
              value={description}            
              inputMode={'text'}
            />
            <View style={styles.textInput}>
              <Text style={styles.tagsLabel}>Tags</Text>
              <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
                {tags.map(({title}) =>(
                  <View style={styles.tagCard}>
                    <Text style={styles.tagCardText}>{title}</Text>
                  </View>
                ))}
                <Pressable style={styles.addButton} onPress={() => setShowFilterOptions(true)}>
                  <Ionicons name="add-sharp" size={20} color="white" />
                </Pressable>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper:{
    paddingTop: Constants.statusBarHeight + 20 || 0,
    backgroundColor: 'white',
    paddingHorizontal: 10
  },
  navBar:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput:{
    backgroundColor: '#0F4D7E',
    color: 'white',
    fontSize: 20,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    textAlignVertical: "top",
    maxHeight: '50%',
  },
  tagsLabel:{
    color: 'white',
    fontSize: 20,
    marginBottom: 5
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
    color: 'white',
  },
  addButton:{
    alignSelf: 'center',
    backgroundColor: '#4DA1C7',
    padding: 2,
    borderRadius: 50,
  }
});