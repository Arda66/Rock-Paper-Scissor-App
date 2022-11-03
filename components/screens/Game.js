import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Game = ({navigation, route}) => {
  const {FirstUserName, SecondUserName} = route.params;
  const [User1Selection, setUser1Selection] = React.useState('');
  const [User2Selection, setUser2Selection] = React.useState('');
  const [is1Disabled, setis1Disabled] = React.useState(false);
  const [is2Disabled, setis2Disabled] = React.useState(false);
  const [User1_isSelected, setUser1_isSelected] = React.useState(false);
  const [User2_isSelected, setUser2_isSelected] = React.useState(false);
  const [User1Score, setUser1Score] = React.useState(0);
  const [User2Score, setUser2Score] = React.useState(0);

  const User1Select = selection => {
    setUser1Selection(selection);
    setUser1_isSelected(true);
    setis1Disabled(true); // disable the buttons
  };

  const User2Select = selection => {
    setUser2Selection(selection);
    setUser2_isSelected(true);
    setis2Disabled(true); // disable the buttons
  };

  const Winner = () => {
    if (User1Score === 2) {
      Alert.alert('Game Over', `${FirstUserName} Won The Game!`, [
        {
          text: 'Play Again',
          onPress: () => {
            setUser1Score(0);
            setUser2Score(0);
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
    } else if (User2Score === 2) {
      Alert.alert('Game Over', `${SecondUserName} Won The Game!`, [
        {
          text: 'Play Again',
          onPress: () => {
            setUser1Score(0);
            setUser2Score(0);
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
    setUser1Selection('');
    setUser2Selection('');
    setUser1_isSelected(false);
    setUser2_isSelected(false);
    setis1Disabled(false);
    setis2Disabled(false);
  };
  const AfterSelection = () => {
    if (User1_isSelected && User2_isSelected) {
      if (User1Selection === User2Selection) {
        Alert.alert(
          'Draw',
          `${FirstUserName}'s Selection : ${User1Selection}\n${SecondUserName}'s Selection : ${User2Selection}`,
          [
            {
              text: 'OK',
              onPress: () => Restart(),
            },
          ],
        );
      } else if (
        (User1Selection === 'Rock' && User2Selection === 'Scissor') ||
        (User1Selection === 'Scissor' && User2Selection === 'Paper') ||
        (User1Selection === 'Paper' && User2Selection === 'Rock')
      ) {
        if (User1Score === 2) Winner();
        else {
          setUser1Score(User1Score + 1);
          Alert.alert(
            FirstUserName + ' Wins',
            `${FirstUserName}'s Selection : ${User1Selection}\n${SecondUserName}'s Selection : ${User2Selection}`,
            [
              {
                text: 'OK',
                onPress: () => Restart(),
              },
            ],
          );
        }
      } else {
        if (User2Score === 2) Winner();
        else {
          setUser2Score(User2Score + 1);
          Alert.alert(
            SecondUserName + ' Wins',
            `${FirstUserName}'s Selection : ${User1Selection}\n${SecondUserName}'s Selection : ${User2Selection}`,
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#D4DFE9'}}>
      {/* User1 Selection Area */}
      <View style={styles.topContainer}>
        <Text style={styles.Title}>{FirstUserName}'s Selection</Text>
        <Text style={styles.Score}>(Score : {User1Score})</Text>
        <View style={styles.ButtonWrapper}>
          <TouchableOpacity
            onPress={() => User1Select('Rock')}
            disabled={is1Disabled}
            style={[styles.Button1, {opacity: User1_isSelected ? 0.4 : 1}]}>
            <Text style={styles.buttonText}>Rock</Text>
            <FontAwesome5Icon name="hand-rock" size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => User1Select('Paper')}
            disabled={is1Disabled}
            style={[styles.Button1, {opacity: User1_isSelected ? 0.4 : 1}]}>
            <Text style={styles.buttonText}>Paper</Text>
            <FontAwesome5Icon name="hand-paper" size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => User1Select('Scissor')}
            disabled={is1Disabled}
            style={[styles.Button1, {opacity: User1_isSelected ? 0.4 : 1}]}>
            <Text style={styles.buttonText}>Scissor</Text>
            <FontAwesome5Icon name="hand-scissors" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={{opacity: User1_isSelected ? 1 : 0}}>
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
        <Text style={styles.Title}>{SecondUserName}'s Selection</Text>
        <Text style={styles.Score}>(Score : {User2Score})</Text>
        <View style={styles.ButtonWrapper}>
          <TouchableOpacity
            onPress={() => User2Select('Rock')}
            disabled={is2Disabled}
            style={[styles.Button2, {opacity: User2_isSelected ? 0.4 : 1}]}>
            <Text style={styles.buttonText}>Rock</Text>
            <FontAwesome5Icon name="hand-rock" size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => User2Select('Paper')}
            disabled={is2Disabled}
            style={[styles.Button2, {opacity: User2_isSelected ? 0.4 : 1}]}>
            <Text style={styles.buttonText}>Paper</Text>
            <FontAwesome5Icon name="hand-paper" size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => User2Select('Scissor')}
            disabled={is2Disabled}
            style={[styles.Button2, {opacity: User2_isSelected ? 0.4 : 1}]}>
            <Text style={styles.buttonText}>Scissor</Text>
            <FontAwesome5Icon name="hand-scissors" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
        <View style={{opacity: User2_isSelected ? 1 : 0}}>
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
            navigation.navigate('MainMenu'), setUser1Score(0), setUser2Score(0);
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
export default Game;
