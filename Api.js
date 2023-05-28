import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-root-toast';

const API_URL = 'http://192.168.178.152:3000';

async function logIn(email, password, setAuthToken, setLoading){
  setLoading(true);
  const logInData = {
      email: email,
      password: password,
  }

  try{
    const response = await fetch(`${API_URL}/users/tokens/sign_in`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInData),
    })
    
    const data = await response.json();
    const newAuthToken = data.token;

    console.log("TEST");
    console.log(data.token)

    if(newAuthToken !== null){
      saveAuthToken(newAuthToken);
      setAuthToken(newAuthToken);
  
      let toast = Toast.show('Logged In.', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP  + 80
      });
    }
    else{
      throw new Error("No AuthToken")
    }

  }catch(error){
        let toast = Toast.show('Login Failed.', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP  + 80
        });
      }
  setLoading(false)
}

async function saveAuthToken(newAuthToken){
  try {
    await SecureStore.setItemAsync('authToken', newAuthToken);
  } catch (error) {
    console.log(error);
  }
}

async function deleteToken() {
  try {
    await SecureStore.deleteItemAsync('authToken');
  } catch (error) {
    console.log(error);
  }
}

export { logIn };