// screens/GameOverScreen.js
import { View, Image, Text, StyleSheet } from 'react-native';
import Title from '../components/ui/Title';
import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
    
  return (
    <View style={styles.rootContainer}>
      <Title>KONIEC GRY!</Title>
      {/* Kontener służący jako maska dla okrągłego obrazu */}
      <View style={styles.imageContainer}>
        <Image 
          style={styles.image} 
          source={require('../assets/images/success.jpg')} 
        />
      </View>
      {/* Przykład zagnieżdżonego tekstu dla podkreślenia wyników */}
      <Text style={styles.summaryText}>
        Twój telefon potrzebował <Text style={styles.highlight}>{roundsNumber}</Text> rund, 
        aby odgadnąć liczbę <Text style={styles.highlight}>{userNumber}</Text>.
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Nowa Gra</PrimaryButton>
    </View>
  );
}

export default GameOverScreen;

const deviceWidth = Dimensions.get('window').width;
const imageSize = deviceWidth < 380 ? 150 : 300; // Rozmiar obrazu zależny od szerokości


const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300, // Stała szerokość
    height: 300, // Stała wysokość (musi być równa szerokości)
    borderRadius: 150, // Połowa szerokości/wysokości tworzy koło
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden', // Ucinanie rogów obrazka
    margin: 36,
    width: imageSize, // Dynamiczna szerokość
    height: imageSize, // Dynamiczna wysokość
    borderRadius: imageSize / 2, // Zawsze połowa rozmiaru tworzy idealne koło

  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'open-sans',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'open-sans-bold',
    color: Colors.primary500, // Wyróżnienie kolorem wyniku
  },
});
