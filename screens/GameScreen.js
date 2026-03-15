
// screens/GameScreen.js
import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import { Ionicons } from '@expo/vector-icons';

// Funkcja generująca liczbę losową z wykluczeniem
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude); // Rekurencja
  } else {
    return rndNum;
  }
}

// Globalne granice (poza komponentem, by nie resetowały się przy re-renderze)
let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver  }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRoundsList, setGuessRoundsList] = useState([]);


    // useEffect uruchomi się zawsze, gdy zmieni się currentGuess, userNumber lub onGameOver
    // useEffect 1 - sprawdza czy gra skończona (uruchamia się gdy zmieni się currentGuess)
  useEffect(() => {
    if (currentGuess === userNumber) {
        // Wywołujemy funkcję przekazaną z App.js, aby zakończyć grę
        onGameOver(guessRoundsList.length + 1);    }
  }, [currentGuess, userNumber, onGameOver]);

  // useEffect 2 - reset granic (uruchamia się tylko raz przy montowaniu komponentu)
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
    }, []);

  // Funkcja obsługująca podpowiedzi użytkownika
  function nextGuessHandler(direction) {
    // Sprawdzenie czy użytkownik nie kłamie
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Nie kłam!", "Wiesz, że to nieprawda...", [
        { text: 'Przepraszam!', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess; // Zawężamy od góry
    } else {
      minBoundary = currentGuess + 1; // Zawężamy od dołu
    }

    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(newRndNumber); // Aktualizacja widoku

    setGuessRoundsList(prev => [currentGuess, ...prev]);
    
  }

  return (
    <View style={styles.screen}>
      <Title>Strzał przeciwnika</Title>
      <View>
          {/* Tu będzie NumberContainer z lekcji 12 */}
          <Title>{currentGuess}</Title> 
      </View>
      <View style={styles.controlsContainer}>
        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            {/* Ikona minusa */}
            <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>

            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
            {/* Ikona plusa */}
            <Ionicons name="add" size={24} color="white" />
        </PrimaryButton>      
        </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  controlsContainer: {
    flexDirection: 'row',
  },
  listContainer: {
    flex: 1, // To pozwala liście zająć pozostałe miejsce i być przewijalną
    padding: 16,
  }
}); 

