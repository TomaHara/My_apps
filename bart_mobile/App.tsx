import 'expo-router/entry';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { SettingDataProvider } from './src/context/SettingDataProvider';
// import { GameContextProvider } from './src/context/GameContextProvider';
// import { ResultsContextProvider } from './src/context/ResultsDataProvider';
// import LoginScreen from './src/screens/Login/LoginScreen';
// import InstructionScreen from './src/screens/Instruction/InstructionScreen';
// import MainGameScreen from './src/screens/MainGame/MainGameScreen';

export type RootStackParamList = {
  Login: undefined;
  MainGame: undefined;
  Instruction: undefined;
  Home: undefined;
};

// export type RootStackParamList = {
//   Login: undefined;
//   Instruction: undefined;
//   MainGame: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <SettingDataProvider>
//         <GameContextProvider>
//           <ResultsContextProvider>
//             <Stack.Navigator
//               initialRouteName="Login"
//               screenOptions={{
//                 headerShown: false,
//               }}
//             >
//               <Stack.Screen name="Login" component={LoginScreen} />
//               <Stack.Screen name="Instruction" component={InstructionScreen} />
//               <Stack.Screen name="MainGame" component={MainGameScreen} />
//             </Stack.Navigator>
//           </ResultsContextProvider>
//         </GameContextProvider>
//       </SettingDataProvider>
//     </NavigationContainer>
//   );
// }
