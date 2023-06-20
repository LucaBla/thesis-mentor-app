import { useContext } from 'react';
import { StyleSheet, Text, Pressable, View, Image } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons'; 
import { TokenContext } from '../App';

export default function ChatCard({id, theme, status, billingStatus, supervisor, student, navigation, secondSupervisedPage = false}){

  const{
    role
  } = useContext(TokenContext);

  function handlePress(){
    if(!secondSupervisedPage){
      navigation.navigate('Chat', {chatId: id})
    }
    else{
      return
    }
  }

  return(
    <Pressable style={styles.supervisorCard} onPress={handlePress}>
      <View style={styles.test}>
        <Image
          style={styles.userImg}
          source={require('../assets/user_img.png')}
        />
        <View style={styles.supervisorInfo}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{theme.title}</Text>
          </View>
          {role === 'Student' ?(
            <View>
              <Text style={styles.nameText}>{supervisor.first_name} {supervisor.last_name}</Text>
            </View>
          ):(
            <View style={{flexDirection: 'row'}}>
              {secondSupervisedPage ?(
                <>
                  <Text style={styles.nameText}>{supervisor.first_name} {supervisor.last_name}</Text>
                  <Text style={styles.nameText}> & {student.first_name} {student.last_name}</Text>
                </>
              ):(
                <Text style={styles.nameText}>{student.first_name} {student.last_name}</Text>
              )
              }
            </View>
          )}
        </View>
      </View>
      <View>
        <View style={styles.statusFlex}>
          <Ionicons name="information" size={18} color="white" />
          <Text style={styles.statusText}>{status.title}</Text>
        </View>
        <View style={styles.statusFlex}>
          <Ionicons name="cash-outline" size={18} color="white" />
          <Text style={styles.statusText}>{billingStatus.title}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  supervisorCard: {
    backgroundColor: '#0F4D7E',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10
  },
  supervisorInfo:{
    flex: 1,
    gap: 0,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 14,
    color: '#4DA1C7',
  },
  title:{
    
  },
  titleText: {
    fontSize: 16,
    color: 'white',
  },
  statusText: {
    fontSize: 14,
    color: 'white',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4DA1C7'
  },
  statusFlex:{
    flexDirection: 'row',
    gap: 5,
  },
  test:{
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  }
});