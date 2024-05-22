import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Card from './components/Card';
import { useEffect, useState } from 'react';

const emojis = [
  '🐶',
  '🐱',
  '🐭',
  '🐹',
  '🐰',
  '🦊',
  '🐻',
  '🐼',
];
const doubleEmojis = [...emojis, ...emojis];

export default function App() {
  const [board, setBoard] = useState(() => shuffle(doubleEmojis));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (selectedCards.length === 2) {
      if (board[selectedCards[0]] === board[selectedCards[1]]) {
        setMatchedCards([...matchedCards, selectedCards[0], selectedCards[1]]);
        setSelectedCards([]);
      } else {
        const timeoutId = setTimeout(() => {
          setSelectedCards([]);
        }, 700);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {
    if (selectedCards.includes(index) || matchedCards.includes(index) || selectedCards.length >= 2) return;
    setSelectedCards([...selectedCards, index]);
    setScore(score + 1);
  };

  const gameFinished = matchedCards.length === doubleEmojis.length;

  const resetGame = () => {
    setBoard(shuffle(doubleEmojis));
    setSelectedCards([]);
    setMatchedCards([]);
    setScore(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{gameFinished ? 'You won!' : 'Memory Game'}</Text>
      <Text style={styles.title}>Score: {score}</Text>

      <View style={styles.dashboard}>
        {board.map((card, index) => (
          <Card
            key={index}
            onPress={() => handleTapCard(index)}
            isTurnedOver={selectedCards.includes(index) || matchedCards.includes(index)}
          >
            {card}
          </Card>
        ))}
      </View>

      {gameFinished &&
        <Pressable onPress={() => resetGame()}>
          <Text style={styles.reset}>Play Again</Text>
        </Pressable>
      }

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 900,
    color: 'white',
  },
  dashboard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 10,
    marginTop: 20
  },
  reset: {
    fontSize: 20,
    fontWeight: 900,
    color: 'white',
    marginTop: 20
  }
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
