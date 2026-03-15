// components/game/NumberContainer.js
import { View, Text, StyleSheet, Dimensions } from 'react-native'; // Import Dimensions

// Pobieramy szerokość urządzenia do obliczeń
const deviceWidth = Dimensions.get('window').width;

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Warunkowy padding: mniejszy dla małych urządzeń
    padding: deviceWidth < 380 ? 12 : 24,
    margin: deviceWidth < 380 ? 12 : 24,
    alignItems: 'center',
  },
  numberText: {
    // Warunkowa wielkość czcionki
    fontSize: deviceWidth < 380 ? 28 : 36,
    textAlign: 'center',
    color: '#ddb52f',
    fontFamily: 'open-sans-bold',
  },
});

export default NumberContainer;