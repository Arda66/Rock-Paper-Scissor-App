import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {React, useState} from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Bot = ({navigation, route}) => {
  const {Username} = route.params;
  const [UserSelection, setUserSelection] = useState('');
  const [BotSelection, setBotSelection] = useState('');
  const [is1Disabled, setis1Disabled] = useState(false);
  const [User_isSelected, setUser_isSelected] = useState(false);
  const [UserScore, setUserScore] = useState(0);
  const [BotScore, setBotScore] = useState(0);

  const UserSelect = selection => {
    BotSelect();
    setUserSelection(selection);
    setUser_isSelected(true);
  };
  function randomInt(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  const BotSelect = () => {
    let selection = randomInt(1, 3);
    if (selection == 1) selection = 'Rock';
    else if (selection == 2) selection = 'Paper';
    else selection = 'Scissor';
    setBotSelection(selection);
  };

  const Winner = () => {
    if (UserScore === 2) {
      Alert.alert('Game Over', `${Username} Won The Game!`, [
        {
          text: 'Play Again',
          onPress: () => {
            setUserScore(0);
            setBotScore(0);
            Restart();
          },
        },
        {
          text: 'Go To Main Menu',
          onPress: () => {
            navigation.navigate('MainMenu');
          },
        },
      ]);
    } else if (BotScore === 2) {
      Alert.alert('Game Over', `Computer Won The Game!`, [
        {
          text: 'Play Again',
          onPress: () => {
            setUserScore(0);
            setBotScore(0);
            Restart();
          },
        },
        {
          text: 'Go To Main Menu',
          onPress: () => {
            navigation.navigate('MainMenu');
          },
        },
      ]);
    }
  };
  const Restart = () => {
    setUserSelection('');
    setBotSelection('');
    setUser_isSelected(false);
    setis1Disabled(false);
  };
  const AfterSelection = () => {
    if (User_isSelected) {
      if (UserSelection === BotSelection) {
        Alert.alert(
          'Draw',
          `${Username}'s Selection : ${UserSelection}\nComputer's Selection : ${BotSelection}`,
          [
            {
              text: 'OK',
              onPress: () => Restart(),
            },
          ],
        );
      } else if (
        (UserSelection === 'Rock' && BotSelection === 'Scissor') ||
        (UserSelection === 'Scissor' && BotSelection === 'Paper') ||
        (UserSelection === 'Paper' && BotSelection === 'Rock')
      ) {
        if (UserScore === 2) Winner();
        else {
          setUserScore(UserScore + 1);
          Alert.alert(
            Username + ' Wins',
            `${Username}'s Selection : ${UserSelection}\nComputer's Selection : ${BotSelection}`,
            [
              {
                text: 'OK',
                onPress: () => Restart(),
              },
            ],
          );
        }
      } else {
        if (BotScore === 2) Winner();
        else {
          setBotScore(BotScore + 1);
          Alert.alert(
            'Computer Wins',
            `${Username}'s Selection : ${UserSelection}\nComputer's Selection : ${BotSelection}`,
            [
              {
                text: 'OK',
                onPress: () => Restart(),
              },
            ],
          );
        }
      }
    } else alert('Please select both users!');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* User1 Selection Area */}
      <View style={styles.topContainer}>
        <Text style={styles.Title}>{Username}'s Selection</Text>
        <Text style={styles.Score}>(Score : {UserScore})</Text>
        <View style={styles.ButtonWrapper}>
          <TouchableOpacity
            onPress={() => UserSelect('Rock')}
            disabled={is1Disabled}
            style={[styles.Button1, {opacity: User_isSelected ? 0.4 : 1}]}>
            <Text style={styles.buttonText}>Rock</Text>
            <FontAwesome5Icon name="hand-rock" size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => UserSelect('Paper')}
            disabled={is1Disabled}
            style={[styles.Button1, {opacity: User_isSelected ? 0.4 : 1}]}>
            <Text style={styles.buttonText}>Paper</Text>
            <FontAwesome5Icon name="hand-paper" size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => UserSelect('Scissor')}
            disabled={is1Disabled}
            style={[styles.Button1, {opacity: User_isSelected ? 0.4 : 1}]}>
            <Text style={styles.buttonText}>Scissor</Text>
            <FontAwesome5Icon name="hand-scissors" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={{opacity: User_isSelected ? 1 : 0}}>
          <Ionicons
            style={{alignSelf: 'center', marginTop: 20}}
            name="checkmark-sharp"
            size={90}
            color={'green'}
          />
        </View>
      </View>
      {/* User 2 Selection Area */}
      <View style={styles.bottomContainer}>
        <Text style={styles.Title}>Computer's Selection</Text>
        <Text style={styles.Score}>(Score : {BotScore})</Text>
        <View style={styles.ButtonWrapper}>
          <TouchableOpacity
            disabled={true}
            style={[styles.Button2, {opacity: 0.4}]}>
            <Text style={styles.buttonText}>Rock</Text>
            <FontAwesome5Icon name="hand-rock" size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={true}
            style={[styles.Button2, {opacity: 0.4}]}>
            <Text style={styles.buttonText}>Paper</Text>
            <FontAwesome5Icon name="hand-paper" size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={true}
            style={[styles.Button2, {opacity: 0.4}]}>
            <Text style={styles.buttonText}>Scissor</Text>
            <FontAwesome5Icon name="hand-scissors" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={{opacity: UserSelection ? 1 : 0}}>
          <Ionicons
            style={{alignSelf: 'center', marginTop: 20}}
            name="checkmark-sharp"
            size={90}
            color={'green'}
          />
        </View>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          onPress={() => AfterSelection()}
          style={[
            styles.Button1,
            {
              backgroundColor: 'aqua',
              width: 100,
              height: 50,
              alignSelf: 'center',
            },
          ]}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MainMenu'), setUserScore(0), setBotScore(0);
          }}
          style={[
            styles.Button1,
            {
              backgroundColor: 'aqua',
              width: 100,
              height: 50,
              alignSelf: 'center',
            },
          ]}>
          <Text style={styles.buttonText}>Return Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D4DFE9',
  },
  topContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
  },
  Title: {
    paddingTop: 30,
    paddingHorizontal: 20,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
  },
  Score: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
  },
  ButtonWrapper: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-around',
  },
  Button1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    width: 100,
    height: 70,
    borderRadius: 25,
    elevation: 10,
    shadowOffset: {
      width: 2,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  Button2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    width: 100,
    height: 70,
    borderRadius: 25,
    opacity: 0.5,
    elevation: 10,
    shadowOffset: {
      width: 2,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  bottomButtons: {
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    elevation: 10,
    shadowOffset: {
      width: 2,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
  },
});
export default Bot;
