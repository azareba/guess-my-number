// screens/StartGameScreen.js
import { useState } from 'react';
import { 
  View, 
  TextInput,
  StyleSheet, 
  Alert,
  KeyboardAvoidingView, 
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnteredNumber] = useState('');
  const { width, height } = useWindowDimensions(); // Dynamiczne wymiary ekranu

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText); // Zapisujemy tekst
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber); // Konwersja na liczbę

    // Sprawdzamy, czy to liczba i czy mieści się w zakresie 1-99
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // Wyświetlamy natywny Alert w razie błędu
      Alert.alert(
        'Niepoprawna liczba!',
        'Liczba musi być z zakresu od 1 do 99.',
        [{ text: 'Rozumiem', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }

    onPickNumber(chosenNumber); // Przekazujemy poprawną liczbę do App.js
  }

  function resetInputHandler() {
    setEnteredNumber(''); // Czyszczenie pola
  }

  // marginTop ustawiamy dynamicznie - mniejszy dla trybu poziomego
  const marginTopDistance = height < 380 ? 30 : 100;

  return (
    // ScrollView jest niezbędne, aby KeyboardAvoidingView mogło przesunąć zawartość
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior="position" // Przesuwa widok do góry, gdy pojawia się klawiatura
      >
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Zgadnij liczbę</Title>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.numberInput}
              maxLength={2}
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={numberInputHandler}
              value={enteredNumber} // Dwukierunkowe wiązanie
            />
            <View style={styles.buttonsContainer}>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmInputHandler}>Potwierdź</PrimaryButton>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    // marginTop ustawiamy dynamicznie za pomocą useWindowDimensions
  },
  inputContainer: {
    padding: 16,
    backgroundColor: '#4e0329',
    borderRadius: 8,
    elevation: 4, // Cień dla Androida
    shadowColor: 'black', // Cień dla iOS
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    alignItems: 'center',
    marginHorizontal: 24,
  },
  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: '#ddb52f',
    borderBottomWidth: 2,
    color: '#ddb52f',
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row', // Przyciski obok siebie
  },
  buttonContainer: {
    flex: 1, // Każdy przycisk zajmuje połowę szerokości kontenera (waga 1:1)
  },
});