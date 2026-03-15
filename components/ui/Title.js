// components/ui/Title.js
import { Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';    

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: 'open-sans-bold',
    color: 'white', // Zmieniamy na biały dla czytelności
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    maxWidth: '80%', // Tytuł zajmie maksymalnie 80% szerokości rodzica
    width: 300,
  },
}); //
