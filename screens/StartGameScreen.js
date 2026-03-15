// screens/StartGameScreen.js
import { useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native'; // Import hooka
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';


function StartGameScreen(props) {
  const [enteredNumber, setEnteredNumber] = useState('');
  
  // Hook automatycznie dostarczy nowe wartości przy obrocie
  const { width, height } = useWindowDimensions();

  // Obliczamy margines dynamicznie w ciele funkcji
  const marginTopDistance = height < 380 ? 30 : 100;

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
    
    props.onPickNumber(chosenNumber); // Przekazujemy poprawną liczbę do App.js
  }

  function resetInputHandler() {
    setEnteredNumber(''); // Czyszczenie pola
  }

  return (
    <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
        <View style={styles.inputContainer}>
            <Title>Zgadnij liczbę</Title>

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
  );
}
export default StartGameScreen;


const styles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    marginTop: 100,
    backgroundColor: '#4e0329',
    borderRadius: 8,
    elevation: 4, // Cień dla Androida
    shadowColor: 'black', // Cień dla iOS
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    alignItems: 'center',
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
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    // margin we współczesnych ekranach mobilnych ustawiamy dynamicznie powyżej
  }
});
