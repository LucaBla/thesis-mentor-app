import { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getSupervisors } from '../Api';
import { TokenContext } from '../App';
import SupervisorsStudent from './SupervisorsStudent';
import SupervisorProfile from './SupervisorProfile';

export default function Supervisors( {navigation}) {

  const{
    authToken,
    role
  } = useContext(TokenContext);

  return (
    <View style={styles.wrapper}>
      {role == 'Student' && 
        <SupervisorsStudent
          navigation={navigation}
        />
      }
      {role === 'Supervisor' &&
        <SupervisorProfile
          navigation={navigation}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    gap: 20
  },
});