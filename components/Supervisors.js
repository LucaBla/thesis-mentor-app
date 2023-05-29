import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, Pressable, FlatList, View, Image } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getSupervisors } from '../Api';
import { TokenContext } from '../App';
import SupervisorCard from './SupervisorCard';
import FilterOptions from './FilterOptions';

export default function Supervisors() {
  const [supervisors, setSupervisors] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  const DATA = [
    {
      email: 'udo@test.de',
      first_name: 'Udo',
      last_name: 'Lustig'
    },
    {
      email: 'Marko@test.de',
      first_name: 'Marko',
      last_name: 'Hellmann'
    },
    {
      email: 'guenter@test.de',
      first_name: 'Günter',
      last_name: 'Witzig'
    },
  ];

  useEffect(() => {
    getSupervisors(authToken, setSupervisors)
  }, []);

  return (
    <View style={styles.ThemesWrapper}>
      {role == 'Student' && 
        <>
          {showFilterOptions == true ? (
            <FilterOptions authToken={authToken} setShowFilterOptions={setShowFilterOptions}/>
          ):(
            <>
              <Pressable style={styles.filterButton} onPress={() => setShowFilterOptions(true)}>
                <Ionicons name="filter" size={20} color="black" />
              </Pressable>
              <FlatList
                data={supervisors}
                renderItem={
                  ({item}) => 
                  <SupervisorCard 
                    email={item.email} 
                    first_name={item.first_name} 
                    last_name={item.last_name}
                    tags = {item.tags}
                  />
                }
                keyExtractor={item => item.id}
              />
            </>
          )
          }
        </>
      }
      {role === 'Supervisor' &&
        <Text>Hallo Betreuer</Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  ThemesWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    gap: 20
  },
  supervisorCard: {
    backgroundColor: '#0F4D7E',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10
  },
  supervisorInfo:{
    flex: 1,
    gap: 5
  },
  name:{
    flex: 1,
    flexDirection: 'row',
    gap: 5
  },
  nameText: {
    fontSize: 16,
    color: 'white',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4DA1C7'
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
    color: 'white'
  },
  filterButton:{
    alignSelf: 'flex-end',
    marginRight: 20
  }
});