import { StatusBar } from 'expo-status-bar';
import { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { logOut } from '../Api';
import { TokenContext } from '../App';
import { getMyThemes } from '../Api';
import ThemeCard from './ThemeCard';
import FilterOptions from './FilterOptions';

export default function MyThemes({navigation}) {
  const [themes, setThemes] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [activeTags, setActiveTags] = useState([]);

  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  useEffect(() => {
    getMyThemes(authToken, setThemes)
  }, []);

  return (
    <>
      {showFilterOptions == true ? (
        <FilterOptions 
          page={'MyThemes'}
          authToken={authToken} 
          setShowFilterOptions={setShowFilterOptions} 
          setThemes={setThemes}
          activeTags={activeTags}
          setActiveTags={setActiveTags}
        />
      ):(
        <View style={styles.themesWrapper}>
          <Pressable style={styles.filterButton} onPress={() => setShowFilterOptions(true)}>
            <Ionicons name="filter" size={20} color="black" />
          </Pressable>
          <Pressable style={styles.addButton} onPress={() => navigation.navigate('CreateTheme')}>
            <Ionicons name="add-sharp" size={24} color="white" />
          </Pressable>
          <View style={styles.themesList}>
            <FlatList
              data={themes}
              renderItem={
                ({item}) => 
                <ThemeCard 
                    title={item.title} 
                    description={item.description} 
                    tags = {item.tags}
                />
              }
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  themesWrapper:{
   
  },
  themesList: {
    paddingVertical: -20
  },
  filterButton:{
    alignSelf: 'flex-end',
    marginRight: 20
  },
  addButton:{
    alignSelf: 'center',
    backgroundColor: '#0F4D7E',
    padding: 5,
    borderRadius: 50,
  }
});