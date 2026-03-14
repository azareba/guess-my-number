// screens/StartGameScreen.js
import { View, StyleSheet, TextInput } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

function StartGameScreen() {
  return (
    <View style={styles.inputContainer}>
      <TextInput style={styles.numberInput} maxLength={2} keyboardType="number-pad" />
      
      {/* Kontener dla rzędu przycisków */}
      <View style={styles.buttonsContainer}>
        {/* Każdy przycisk owijamy w View z flex: 1, aby zajęły po 50% szerokości */}
        <View style={styles.buttonContainer}>
          <PrimaryButton>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton>Confirm</PrimaryButton>
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
  }
});
