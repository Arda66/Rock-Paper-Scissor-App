import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';

const MainMenu = ({navigation}) => {
  const [User1Name, setUser1Name] = React.useState('');
  const [User2Name, setUser2Name] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={{flex: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <Text style={styles.title}>
            Welcome To the Rock-Paper-Scissor Game
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (User1Name.trim().length > 0 && User2Name.trim().length > 0) {
                Keyboard.dismiss();
                navigation.navigate('Game', {
                  FirstUserName: User1Name,
                  SecondUserName: User2Name,
                });
                setUser1Name('');
                setUser2Name('');
              } else alert('Name can bot be null or empty!');
            }}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
          <TextInput
            autoCapitalize="sentences"
            style={styles.input}
            placeholder="Enter First User's Name"
            placeholderTextColor={'gray'}
            value={User1Name}
            onChangeText={text => setUser1Name(text)}
          />
          <TextInput
            autoCapitalize="sentences"
            style={styles.input}
            placeholder="Enter Second User's Name"
            placeholderTextColor={'gray'}
            value={User2Name}
            onChangeText={text => setUser2Name(text)}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9D3DC',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 27,
    color: '#1B659A',
    paddingTop: 50,
    lineHeight: 40,
    fontFamily: 'MontserratSemibold',
  },
  button: {
    alignSelf: 'center',
    marginTop: 80,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9FB798',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    fontFamily: 'MontserratSemiBold',
  },
  input: {
    alignSelf: 'center',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: 55,
    borderRadius: 25,
    backgroundColor: 'white',
    color: 'black',
  },
});
export default MainMenu;
