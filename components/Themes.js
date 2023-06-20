import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { TokenContext } from '../App';
import ThemesStudent from './ThemesStudent';
import ThemesSupervisor from './ThemesSupervisor';

export default function Themes({navigation}) {

  const{
    role
  } = useContext(TokenContext);

  return (
    <View style={styles.wrapper}>
      {role == 'Student' && 
        <ThemesStudent
          navigation={navigation}
        />
      }
      {role === 'Supervisor' &&
      <ThemesSupervisor
        navigation={navigation}
      />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  }
});

