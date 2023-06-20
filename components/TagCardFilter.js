import { useEffect, useState } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

export default function tagCardFilter({title, id, setActiveTags, activeTags}){
  const [isActive, setIsActive] = useState(activeTags.includes(id));

  function activateTag(){
    if(isActive){
      setIsActive(!isActive);
      setActiveTags(prevData => prevData.filter(item => item !== id));
    }
    else{
      setIsActive(!isActive);
      setActiveTags(prevData => [...prevData, id]);
    }
  }

  useEffect(() => {
    setIsActive(activeTags.includes(id));
  }, [activeTags]);

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