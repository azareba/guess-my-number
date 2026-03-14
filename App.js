// App.js
import { StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import gradientu
import StartGameScreen from './screens/StartGameScreen';

export default function App() {
  return (
    // Gradient jako główny kontener
    <LinearGradient 
      colors={['#4e0329', '#ddb52f']} // Tablica kolorów przejścia
      style={styles.rootScreen}
    >
      {/* Obraz tła z nałożoną przezroczystością */}
      <ImageBackground 
        source={require('./assets/images/background.jpg')} // Ścieżka do pliku
        resizeMode="cover" 
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage} // Styl dla samego obrazu (warstwy wewnętrznej)
      >
        <StartGameScreen />
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1, // Wypełnij cały ekran
  },
  backgroundImage: {
    opacity: 0.15, // Nadanie przezroczystości, aby gradient "przebijał" spod obrazka
  }
});