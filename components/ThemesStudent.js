import { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { TokenContext } from '../App';
import { getThemes } from '../Api';
import ThemeCard from './ThemeCard';
import FilterOptions from './FilterOptions';

export default function ThemesStudent({navigation}) {
  const [themes, setThemes] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [activeTags, setActiveTags] = useState([]);

  const{
    authToken,
  } = useContext(TokenContext);

  useEffect(() => {
    getThemes(authToken, setThemes)
  }, []);

  return (
    <>
      {showFilterOptions == true ? (
        <FilterOptions 
          page={'Themes'}
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
          <View style={styles.themesList}>
            <FlatList
              data={themes}
              renderItem={
                ({item}) => 
                <ThemeCard 
                    navigation={navigation}
                    id={item.id}
                    title={item.title} 
                    description={item.description} 
                    tags = {item.tags}
                    supervisorId = {item.supervisor_id}
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
    paddingVertical: -20,
    paddingBottom: 60,
  },
  filterButton:{
    alignSelf: 'flex-end',
    marginRight: 20
  }
});