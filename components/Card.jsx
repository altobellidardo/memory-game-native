import { Pressable, StyleSheet, Text } from "react-native"


function Card ({ children, onPress, isTurnedOver }) {
  return (
    <Pressable style={isTurnedOver ? styles.cardUp : styles.cardDown} onPress={onPress}>
      <Text style={styles.text}>
        {isTurnedOver ? children : '?'}
      </Text>
    </Pressable>
  )
}

export default Card

const styles = StyleSheet.create({
  cardDown: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff11',
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardUp: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff22',
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 50,
    color: 'white',
    userSelect: 'none',
  }
})
