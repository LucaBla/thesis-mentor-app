import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Button, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Keyboard, ActivityIndicator } from 'react-native';
import { logIn } from '../Api';
import { TokenContext } from '../App';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const{
    authToken,
    setAuthToken
  } = useContext(TokenContext);

  return (
    <TouchableOpacity style={styles.logInPage} onPress={()=>Keyboard.dismiss()} activeOpacity={1}>
      <StatusBar style="light" />
      <Text 
        style={styles.logInHeader}
      >
        ThesisMentor
      </Text>
      <View>
      <View style={styles.logInForm}>
        <TextInput 
          style={styles.textInput} 
          placeholder='E-Mail' 
          placeholderTextColor='rgba(255,255,255, 0.5)'
          onSubmitEditing={Keyboard.dismiss}
          onChangeText={setEmail}
          value={email}            
          inputMode={'email'}
        />
        <TextInput 
          style={styles.textInput} 
          placeholder='Password' 
          placeholderTextColor='rgba(255,255,255, 0.5)'
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <Pressable
          style={styles.logInButton} 
          onPress={() => logIn(email, password, setAuthToken, setLoading)}
          disabled={loading}
        >
        {!loading?(
          <Text 
            style={styles.logInButtonText}
          >
            LogIn
          </Text>
        ):(
          <ActivityIndicator size='small' color='#ffffff' style={styles.activityIndicator}/>
        )}
        </Pressable>
      </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  logInPage: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0F4D7E',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight + 20 || 0,
    gap: 20
  },
  logInHeader:{
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  logInForm:{
    gap: 10,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput:{
    backgroundColor: '#4DA1C7',
    color: 'white',
    fontSize: 20,
    width: '100%',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  logInButton:{
    borderRadius: 5,
    backgroundColor: '#67B345',
    paddingVertical: 5,
    width: '50%',
    alignSelf: 'flex-start'
  },
  logInButtonText:{
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  }
});