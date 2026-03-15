// screens/GameScreen.js
import { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, useWindowDimensions, FlatList} from 'react-native';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import NumberContainer from '../components/game/NumberContainer'; // ✅ dodany import
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

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

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRoundsList, setGuessRoundsList] = useState([]);
  const { width } = useWindowDimensions();

  // useEffect 1 - sprawdza czy gra skończona (uruchamia się gdy zmieni się currentGuess)
  useEffect(() => {
    if (currentGuess === userNumber) {
      // Wywołujemy funkcję przekazaną z App.js, aby zakończyć grę
      onGameOver(guessRoundsList.length + 1);
    }
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

  // ✅ content jest tutaj - w ciele komponentu, nie w funkcji!
  // Domyślna treść dla trybu pionowego
  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={styles.controlsContainer}>
        <PrimaryButton onPress={() => nextGuessHandler('lower')}>
          <Ionicons name="remove" size={24} color="white" />
        </PrimaryButton>
        <PrimaryButton onPress={() => nextGuessHandler('greater')}>
          <Ionicons name="add" size={24} color="white" />
        </PrimaryButton>
      </View>
    </>
  );

  // Zmiana układu dla trybu poziomego (szerokość > 500px)
  if (width > 500) {
    content = (
      <View style={styles.buttonsContainerWide}>
        <PrimaryButton onPress={() => nextGuessHandler('lower')}>
          <Ionicons name="remove" size={24} color="white" />
        </PrimaryButton>
        <NumberContainer>{currentGuess}</NumberContainer>
        <PrimaryButton onPress={() => nextGuessHandler('greater')}>
          <Ionicons name="add" size={24} color="white" />
        </PrimaryButton>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Strzał przeciwnika</Title>
      {content}
      <View style={styles.listContainer}>
        {<FlatList
            data={guessRoundsList}
            renderItem={(itemData) => (
            <GuessLogItem
                roundNumber={guessRoundsList.length - itemData.index} // Numerujemy od końca
                guess={itemData.item}
            />
            )}
            keyExtractor={(item, index) => index.toString()}
        />}
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1, // To pozwala liście zająć pozostałe miejsce i być przewijalną
    padding: 16,
  },
  buttonsContainerWide: {
    flexDirection: 'row', // Przyciski obok NumberContainer
    alignItems: 'center',
    justifyContent: 'center',
  },
});