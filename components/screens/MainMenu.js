import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Alert,
} from 'react-native';
import {React, useState} from 'react';

const MainMenu = ({navigation}) => {
  const [User1Name, setUser1Name] = useState('');
  const [User2Name, setUser2Name] = useState('');
  const [pvpSelected, setpvpSelected] = useState(false);
  const [BotSelected, setBotSelected] = useState(false);

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
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.button, {borderWidth: pvpSelected ? 2 : 0}]}
              onPress={() => {
                setUser1Name('');
                setUser2Name('');
                setBotSelected(false);
                setpvpSelected(true);
              }}>
              <Text style={styles.buttonText}>2 Player</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {borderWidth: BotSelected ? 2 : 0}]}
              onPress={() => {
                setUser1Name('');
                setUser2Name('');
                setpvpSelected(false);
                setBotSelected(true);
              }}>
              <Text style={styles.buttonText}>Against Bot</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            autoCapitalize="sentences"
            style={styles.input}
            placeholder={
              BotSelected ? 'Enter your Username' : "Enter First User's Name"
            }
            placeholderTextColor={'gray'}
            value={User1Name}
            onChangeText={text => setUser1Name(text)}
          />
          <TextInput
            autoCapitalize="sentences"
            style={[styles.input, {opacity: BotSelected ? 0 : 1}]}
            editable={BotSelected ? false : true}
            placeholder="Enter Second User's Name"
            placeholderTextColor={'gray'}
            value={User2Name}
            onChangeText={text => setUser2Name(text)}
          />
          <TouchableOpacity
            style={[styles.button, {marginTop: 40}]}
            onPress={() => {
              if (BotSelected || pvpSelected) {
                if (BotSelected) {
                  if (User1Name.trim().length > 0) {
                    Keyboard.dismiss();
                    navigation.navigate('Bot', {
                      Username: User1Name,
                    });
                    setUser1Name('');
                    setUser2Name('');
                  } else {
                    setUser1Name('');
                    setUser2Name('');
                    alert('UserName can not be null or empty!');
                  }
                } else {
                  if (
                    User1Name.trim().length > 0 &&
                    User2Name.trim().length > 0
                  ) {
                    if (User1Name.toLowerCase() === User2Name.toLowerCase()) {
                      Alert.alert(
                        'Error',
                        'Both Users can not have same name!',
                        [
                          {
                            text: 'Ok',
                            onPress: () => {
                              setUser1Name('');
                              setUser2Name('');
                            },
                          },
                        ],
                      );
                    } else {
                      Keyboard.dismiss();
                      navigation.navigate('Game', {
                        FirstUserName: User1Name,
                        SecondUserName: User2Name,
                      });
                      setUser1Name('');
                      setUser2Name('');
                    }
                  } else {
                    setUser1Name('');
                    setUser2Name('');
                    alert('Player names can not be null or empty!');
                  }
                }
              } else alert('Please Select one of the options!');
            }}>
            <Text style={styles.buttonText}>Play</Text>
          </TouchableOpacity>
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
    paddingTop: 20,
    lineHeight: 40,
    fontFamily: 'MontserratSemibold',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    alignSelf: 'center',
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9FB798',
    shadowColor: '#000',
    elevation: 10,
    shadowOffset: {
      width: 2,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    borderColor: 'yellow',
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
