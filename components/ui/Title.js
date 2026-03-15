// components/ui/Title.js
import Colors from '../../constants/colors';    
import { Text, StyleSheet, Platform } from 'react-native';


function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    // Użycie Platform.select dla elegancji kodu
    borderWidth: Platform.select({ ios: 0, android: 2 }), // 0 na iOS, 2 na Androidzie
    borderColor: 'white',
    padding: 12,
  },
}); //
