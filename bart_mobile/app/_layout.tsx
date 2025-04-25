import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { AuthProvider } from '../src/context/AuthProvider';
import { SettingDataProvider } from '../src/context/SettingDataProvider';
import { GameContextProvider } from '../src/context/GameContextProvider';
import { ResultsContextProvider } from '../src/context/ResultsDataProvider';

// スプラッシュスクリーンが自動的に非表示になるのを防ぐ
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <SettingDataProvider>
        <GameContextProvider>
          <ResultsContextProvider>
            <Stack
              screenOptions={{ headerShown: false, gestureEnabled: false }}
            >
              <Stack.Screen name="index" />
              <Stack.Screen name="login" />
              <Stack.Screen name="instruction" />
              <Stack.Screen name="mainGame" />
            </Stack>
          </ResultsContextProvider>
        </GameContextProvider>
      </SettingDataProvider>
    </AuthProvider>
  );
}
