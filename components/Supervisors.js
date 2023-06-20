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
import SupervisorsStudent from './SupervisorsStudent';
import SupervisorProfile from './SupervisorProfile';

export default function Supervisors( {navigation}) {
  const [supervisors, setSupervisors] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [activeTags, setActiveTags] = useState([]);

  const{
    authToken,
    setAuthToken,
    role
  } = useContext(TokenContext);

  useEffect(() => {
    getSupervisors(authToken, setSupervisors)
  }, []);

  return (
    <View style={styles.ThemesWrapper}>
      {role == 'Student' && 
        <SupervisorsStudent
          navigation={navigation}
        />
      }
      {role === 'Supervisor' &&
        <SupervisorProfile/>
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
  supervisorList:{
    paddingBottom: 100
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