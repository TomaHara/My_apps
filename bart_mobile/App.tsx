import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthProvider';
import { GameContextProvider } from './src/context/GameContextProvider';
import { SettingDataProvider } from './src/context/SettingDataProvider';
import { ResultsContextProvider } from './src/context/ResultsDataProvider';

import LoginScreen from './src/screens/Login';
import InstructionScreen from './src/screens/Instruction';
import MainGameScreen from './src/screens/MainGame';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AuthProvider>
        <SettingDataProvider>
          <GameContextProvider>
            <ResultsContextProvider>
              <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen
                  name="Instruction"
                  component={InstructionScreen}
                />
                <Stack.Screen name="MainGame" component={MainGameScreen} />
              </Stack.Navigator>
            </ResultsContextProvider>
          </GameContextProvider>
        </SettingDataProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
