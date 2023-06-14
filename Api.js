import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-root-toast';

const API_URL = 'http://192.168.178.152:3000';

async function getRole(authToken, setRole){
  if(authToken == null){
    return;
  }else{
    try{
      const response = await fetch(`${API_URL}/users/tokens/info`, {
        method: "get",
        headers: {
          "Authorization": authToken,
        }
      })

      if (!response.ok) {
        const message = `An error has occured: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }

      const json = await response.json();
      const role = json.role;
      
      setRole(role);

    } catch(error){
      
    }
  }
}

async function getSupervisors(authToken, setSupervisors){
  if(authToken == null){
    return;
  }else{
    try{
      const response = await fetch(`${API_URL}/supervisor`, {
        method: "get",
        headers: {
          "Authorization": authToken,
        }
      })

      if (!response.ok) {
        const message = `An error has occured: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }

      const json = await response.json();
      setSupervisors(json);

    } catch(error){
      
    }
  }
}

async function getThemes(authToken, setThemes){
  if(authToken == null){
    return;
  }else{
    try{
      const response = await fetch(`${API_URL}/theme`, {
        method: "get",
        headers: {
          "Authorization": authToken,
        }
      })

      if (!response.ok) {
        const message = `An error has occured: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }

      const json = await response.json();
      setThemes(json);

    } catch(error){
      
    }
  }
}

async function getMyThemes(authToken, setThemes){
  if(authToken == null){
    return;
  }else{
    try{
      const response = await fetch(`${API_URL}/supervisor/themes`, {
        method: "get",
        headers: {
          "Authorization": authToken,
        }
      })

      if (!response.ok) {
        const message = `An error has occured: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }

      const json = await response.json();
      setThemes(json);

    } catch(error){
      
    }
  }
}

async function getTags(authToken, setTags, searchQuery){
  console.log('test');
  if(authToken == null){
    return;
  }else{
    if(searchQuery !== null){
      try{
        const response = await fetch(`${API_URL}/tags?title=` +searchQuery, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "Authorization": authToken,
          },
        })
        if (!response.ok) {
          const message = `An error has occured: ${response.status} - ${response.statusText}`;
          throw new Error(message);
        }
  
        const json = await response.json();
        setTags(json);
  
      } catch(error){
        console.log(error);
      }
    }else{
      try{
        const response = await fetch(`${API_URL}/tags`, {
          method: "get",
          headers: {
            "Authorization": authToken,
          }
        })
  
        if (!response.ok) {
          const message = `An error has occured: ${response.status} - ${response.statusText}`;
          throw new Error(message);
        }
  
        const json = await response.json();
        setTags(json);
  
      } catch(error){
        
      }
    }
    }
}

async function getSupervisor(authToken, setSupervisor, id){
  if(authToken == null){
    return;
  }else{
    if(id == null){
      try{
        const response = await fetch(`${API_URL}/supervisor/null`, {
          method: "get",
          headers: {
            "Authorization": authToken,
          }
        })
  
        if (!response.ok) {
          const message = `An error has occured: ${response.status} - ${response.statusText}`;
          throw new Error(message);
        }
  
        const json = await response.json();
        setSupervisor(json);
  
      } catch(error){
        
      }
    }
    else{
      try{
        const response = await fetch(`${API_URL}/supervisor/${id}`, {
          method: "get",
          headers: {
            "Authorization": authToken,
          }
        })
  
        if (!response.ok) {
          const message = `An error has occured: ${response.status} - ${response.statusText}`;
          throw new Error(message);
        }
  
        const json = await response.json();
        setSupervisor(json);
  
      } catch(error){
        
      }
    }
    }
}

async function getSupervisorFromText(authToken, setSupervisors, ids){
  if(authToken == null){
    return;
  }else{
    try{
      const response = await fetch(`${API_URL}/supervisor?ids[]=` + ids.join("&ids[]="), {
        method: "get",
        headers: {
          "Authorization": authToken,
        }
      })

      if (!response.ok) {
        const message = `An error has occured: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }

      const json = await response.json();
      setSupervisors(json);

    } catch(error){
      
    }
  }
}

async function getThemeFromText(authToken, setTheme, ids){
  if(authToken == null){
    return;
  }else{
    try{
      const response = await fetch(`${API_URL}/theme?ids[]=` + ids.join("&ids[]="), {
        method: "get",
        headers: {
          "Authorization": authToken,
        }
      })

      if (!response.ok) {
        const message = `An error has occured: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }

      const json = await response.json();
      setTheme(json);

    } catch(error){
      
    }
  }
}

async function getMyThemeFromText(authToken, setTheme, ids){
  if(authToken == null){
    return;
  }else{
    try{
      const response = await fetch(`${API_URL}/supervisor/themes?ids[]=` + ids.join("&ids[]="), {
        method: "get",
        headers: {
          "Authorization": authToken,
        }
      })

      if (!response.ok) {
        const message = `An error has occured: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }

      const json = await response.json();
      setTheme(json);

    } catch(error){
      
    }
  }
}

async function getChats(authToken, setChats){
  if(authToken == null){
    return;
  }else{
    try{
      const response = await fetch(`${API_URL}/chats`, {
        method: "get",
        headers: {
          "Authorization": authToken,
        }
      })

      if (!response.ok) {
        const message = `An error has occured: ${response.status} - ${response.statusText}`;
        throw new Error(message);
      }

      const json = await response.json();
      setChats(json);

    } catch(error){
      
    }
  }
}

async function getStatuses(authToken, setStatuses, searchQuery){
  if(authToken == null){
    return
  }
  else{
    if(searchQuery !== null){
          try{
            const response = await fetch(`${API_URL}/statuses?title=` +searchQuery, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                "Authorization": authToken,
              },
            })
            if (!response.ok) {
              const message = `An error has occured: ${response.status} - ${response.statusText}`;
              throw new Error(message);
            }
      
            const json = await response.json();
            setStatuses(json);
      
          } catch(error){
            console.log(error);
          }
        }else{
          try{
            const response = await fetch(`${API_URL}/statuses`, {
              method: "get",
              headers: {
                "Authorization": authToken,
              }
            })
      
            if (!response.ok) {
              const message = `An error has occured: ${response.status} - ${response.statusText}`;
              throw new Error(message);
            }
      
            const json = await response.json();
            setStatuses(json);
      
          } catch(error){
            
          }
        }
  }
}

async function postTheme(authToken, title, description, tag_ids){
  if(authToken == null){
    return;
  }

  const themeData = {
    theme:{
      title: title,
      description: description,
      tag_ids: tag_ids
    }
  }

  try{
    const response = await fetch(`${API_URL}/theme`, {
      method: "post",
      headers: {
        "Authorization": authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(themeData),
    })

    if (!response.ok) {
      const message = `An error has occured: ${response.status} - ${response.statusText}`;
      throw new Error(message);
    }

    const json = await response.json();

  }catch(error){
        
      }
}

async function addTagsFromSupervisor(authToken, setSupervisor, ids){
  if(authToken == null){
    return;
  }

  const IdsData = {
    tags:{
      ids: ids
    }
  }

  try{
    const response = await fetch(`${API_URL}/supervisor/add_tags`, {
      method: "post",
      headers: {
        "Authorization": authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(IdsData),
    })

    if (!response.ok) {
      const message = `An error has occured: ${response.status} - ${response.statusText}`;
      throw new Error(message);
    }

    const json = await response.json();
    setSupervisor(json);

  }catch(error){
        
      }
}

async function removeTagsFromSupervisor(authToken, setSupervisor, ids){
  if(authToken == null){
    return;
  }

  const IdsData = {
    tags:{
      ids: ids
    }
  }

  try{
    const response = await fetch(`${API_URL}/supervisor/remove_tags`, {
      method: "post",
      headers: {
        "Authorization": authToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(IdsData),
    })

    if (!response.ok) {
      const message = `An error has occured: ${response.status} - ${response.statusText}`;
      throw new Error(message);
    }

    const json = await response.json();
    setSupervisor(json);

  }catch(error){
        
      }
}

async function validateToken(authToken, setIsValidAuthToken){
  if(authToken == null){
    setIsValidAuthToken(false);
  }else{
    try{
      const response = await fetch(`${API_URL}/users/tokens/info`, {
        method: "get",
        headers: {
          "Authorization": authToken,
        }
      })

      if (!response.ok) {
        const message = `An error has occured: ${response.status} - ${response.statusText}`;
        setIsValidAuthToken(false);
        throw new Error(message);
      }

      const json = await response.json();
      
      setIsValidAuthToken(true);

    } catch(error){
      setIsValidAuthToken(false);
    }
  }
}

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
    console.log(error);
        let toast = Toast.show('Login Failed.', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP  + 80
        });
      }
  setLoading(false)
}

async function logOut(authToken, setAuthToken, setLoading){
  setLoading(true);

  try{
    const response = await fetch(`${API_URL}/users/tokens/sign_in`, {
      method: "post",
      headers: {
        "Authorization": authToken,
      }
    })

    setAuthToken(null);
    deleteToken();

    let toast = Toast.show('Logged Out.', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP  + 80
    });

  }catch(error){
        let toast = Toast.show('Log Out Failed.', {
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

export { logIn, 
         validateToken, 
         logOut, 
         getRole, 
         getSupervisors, 
         getTags, 
         getSupervisorFromText, 
         getSupervisor, 
         removeTagsFromSupervisor,
         addTagsFromSupervisor,
         getThemes,
         getMyThemes,
         getThemeFromText,
         getMyThemeFromText,
         postTheme,
         getChats,
         getStatuses
       };