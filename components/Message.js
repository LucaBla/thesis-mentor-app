import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TokenContext } from '../App';

export default function Message({ content, messageId }) {

  const{
    userId
  } = useContext(TokenContext);

  return (
    <>
    {userId === messageId ?(
      <View style={styles.myMessage}><Text style={styles.messageText}>{content}</Text></View>
    ):(
      <View style={styles.yourMessage}><Text style={styles.messageText}>{content}</Text></View>
    )
    }
    </>
  );
}

const styles = StyleSheet.create({
  myMessage:{
    backgroundColor: '#4DA1C7',
    alignSelf: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    minWidth: '20%',
    maxWidth: '90%',

  },
  yourMessage:{
    backgroundColor: '#4DA1C7',
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    minWidth: '20%',
    maxWidth: '90%',
  },
  messageText:{
    color: 'white',
  }
});