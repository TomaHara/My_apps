import { Stack } from 'expo-router';
import { memo, useEffect } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '../src/context/AuthProvider';
import { SettingDataProvider } from '../src/context/SettingDataProvider';
import { GameContextProvider } from '../src/context/GameContextProvider';
import { ResultsContextProvider } from '../src/context/ResultsDataProvider';
import { LanguageProvider } from '../src/context/LanguageProvider';

// スプラッシュスクリーンが自動的に非表示になるのを防ぐ
// SplashScreen.preventAutoHideAsync();

// メモ化されたプロバイダーラッパー
const MemoizedProviders = memo(
  ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>
      <LanguageProvider>
        <SettingDataProvider>
          <GameContextProvider>
            <ResultsContextProvider>{children}</ResultsContextProvider>
          </GameContextProvider>
        </SettingDataProvider>
      </LanguageProvider>
    </AuthProvider>
  )
);

export default function RootLayout() {
  // useEffect(() => {
  //   // アプリの準備が整ったらスプラッシュスクリーンを非表示にする
  //   const hideSplash = async () => {
  //     await SplashScreen.hideAsync();
  //   };
  //   hideSplash();
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MemoizedProviders>
        <Stack
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              contentStyle: { backgroundColor: '#fff' },
            }}
          />
          <Stack.Screen
            name="login/index"
            options={{
              contentStyle: { backgroundColor: '#fff' },
            }}
          />
          <Stack.Screen
            name="signup/index"
            options={{
              contentStyle: { backgroundColor: '#fff' },
            }}
          />
          {/* Add the new screen for language selection */}
          <Stack.Screen
            name="selectLanguage/index"
            options={{
              contentStyle: { backgroundColor: '#fff' },
            }}
          />
          <Stack.Screen
            name="sleepQuestionnaire/index"
            options={{
              contentStyle: { backgroundColor: '#fff' },
            }}
          />
          <Stack.Screen
            name="instruction/index"
            options={{
              contentStyle: { backgroundColor: '#fff' },
            }}
          />
          <Stack.Screen
            name="mainGame/index"
            options={{
              contentStyle: { backgroundColor: '#fff' },
            }}
          />
          <Stack.Screen
            name="taskQuestionnaire/index"
            options={{
              contentStyle: { backgroundColor: '#fff' },
            }}
          />
        </Stack>
      </MemoizedProviders>
    </GestureHandlerRootView>
  );
}
