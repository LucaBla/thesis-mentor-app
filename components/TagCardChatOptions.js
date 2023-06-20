import { useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

export default function tagCardChatOptions({title, id, setActiveTag, activeTag}){
  const [isActive, setIsActive] = useState(activeTag == id);

  function activateTag(){
    if(isActive){
      return
    }
    else{
      setIsActive(true);
      setActiveTag(id);
    }
  }

  useEffect(() => {
    setIsActive(activeTag == id);
  }, [activeTag]);

  return(
    <Pressable onPress={activateTag}
            style={[styles.tagCard, isActive ? styles.tagCardActive : null]}
          >
            <Text style={styles.tagCardText}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tagCard:{
    backgroundColor: '#B34545',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  tagCardActive:{
    backgroundColor: '#67B345',
  },
  tagCardText:{
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});