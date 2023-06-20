import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Pressable, FlatList, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { getSupervisors } from '../Api';
import { TokenContext } from '../App';
import SupervisorCard from './SupervisorCard';
import FilterOptions from './FilterOptions';

export default function SupervisorsStudent({navigation}) {
  const [supervisors, setSupervisors] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [activeTags, setActiveTags] = useState([]);

  const{
    authToken,
  } = useContext(TokenContext);

  useEffect(() => {
    getSupervisors(authToken, setSupervisors)
  }, []);

  return (
    <>
      {showFilterOptions == true ? (
        <FilterOptions 
          page={'Supervisors'}
          authToken={authToken} 
          setShowFilterOptions={setShowFilterOptions} 
          setSupervisors={setSupervisors}
          activeTags={activeTags}
          setActiveTags={setActiveTags}
        />
      ):(
        <View>
          <Pressable style={styles.filterButton} onPress={() => setShowFilterOptions(true)}>
            <Ionicons name="filter" size={20} color="black" />
          </Pressable>
          <View style={styles.supervisorList}>
            <FlatList
              data={supervisors}
              renderItem={
                ({item}) => 
                <SupervisorCard 
                  navigation={navigation}
                  id={item.id} 
                  email={item.email} 
                  first_name={item.first_name} 
                  last_name={item.last_name}
                  tags = {item.tags}
                />
              }
              keyExtractor={item => item.id}
            />
          </View>
        </View>
          )
          }
    </>
  );
}

const styles = StyleSheet.create({
  supervisorList:{
    paddingBottom: 120
  },
  filterButton:{
    alignSelf: 'flex-end',
    marginRight: 20
  }
});