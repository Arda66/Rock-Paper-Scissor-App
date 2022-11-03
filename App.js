import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainMenu from './components/screens/MainMenu';
import Game from './components/screens/Game';
import Bot from './components/screens/Bot';
const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Game"
          component={Game}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Bot"
          component={Bot}
          options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
