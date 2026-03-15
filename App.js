// App.js
import { useState } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font'; // Hook do ładowania czcionek
import AppLoading from 'expo-app-loading'; // Komponent blokujący ekran startowy

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState(); // Stan przechowujący wybraną liczbę
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0); // Stan przechowujący liczbę rund

  // Ładowanie plików czcionek z folderu assets
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });

  // Jeśli czcionki się jeszcze ładują, pokazujemy ekran powitalny (Splash Screen)
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function startNewGameHandler() {
    setUserNumber(null); // Powrót do StartGameScreen
    setGuessRounds(0); // Reset licznika rund
  }
  
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber); // Ustawienie liczby powoduje zmianę ekranu
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }
  

  // Logika wyboru ekranu
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  if (userNumber && !gameIsOver) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />;
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen 
        userNumber={userNumber} 
        roundsNumber={guessRounds} 
        onStartNewGame={startNewGameHandler} // Przekazanie funkcji restartu
      />
    );
  }

  return (
    <LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.rootScreen}>
      <ImageBackground
        source={require('./assets/images/background.jpg')}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {/* SafeAreaView chroni przed notchem */}
        <SafeAreaView style={styles.rootScreen}>
          {screen}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});