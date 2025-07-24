import { Text, TouchableOpacity, StyleSheet } from 'react-native';
const Button = ({text, action}) => {
  return (
    <TouchableOpacity onPress={action} style={styles.button}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007910ff',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  }
});
export default Button