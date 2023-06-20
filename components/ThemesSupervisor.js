import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import ThemesStudent from './ThemesStudent';
import MyThemes from './MyThemes';

export default function ThemesSupervisor({navigation}) {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <View style={styles.themeSelector}>
        <Pressable style={showAll? styles.active : styles.notActive} onPress={()=> setShowAll(true)}>
          <Text style={styles.themeSelectorText}>Alle</Text>
        </Pressable>
        <Pressable style={!showAll? styles.active : styles.notActive} onPress={()=> setShowAll(false)}>
          <Text style={styles.themeSelectorText}>Eigene</Text>
        </Pressable>
      </View>
      {showAll ? (
        <ThemesStudent/>
      ):(
        <MyThemes
          navigation={navigation}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  themeSelector:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0F4D7E',
  },
  themeSelectorText:{
    color: 'white'
  },
  themesList: {
    paddingVertical: -20
  },
  filterButton:{
    alignSelf: 'flex-end',
    marginRight: 20
  },
  notActive:{
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  active:{
    paddingVertical: 10,
    backgroundColor: '#15609B',
    width: '50%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  }
});