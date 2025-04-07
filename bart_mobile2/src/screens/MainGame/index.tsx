import React, { useContext, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { GameContext } from '../../context/GameContextProvider';
import { SettingData } from '../../context/SettingDataProvider';
import { ResultsContext } from '../../context/ResultsDataProvider';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useAuth } from '../../context/AuthProvider';
import { Balloon } from './components/Balloon';
import { PompButton } from './components/PompButton';
import { CollectButton } from './components/CollectButton';
import { EarningsDisplay } from './components/EarningsDisplay';

export default function MainGameScreen() {
  const settings = useContext(SettingData);
  const { results, resetResults } = useContext(ResultsContext);
  const { resetValues } = useContext(GameContext);
  const { user, signOut } = useAuth();
  const trialCount = results.earnings.length;
  const totalTrials = settings.TrialBlocks * 10;

  useEffect(() => {
    if (!settings || !results) {
      router.replace('/login');
    }
  }, [settings, results]);

  const handleGameEnd = useCallback(async () => {
    if (user) {
      try {
        await addDoc(collection(db, 'Shozemi', user.uid, 'PlayData'), {
          results,
          settings,
          gameCompleteTimestamp: serverTimestamp(),
        });
        resetResults();
        resetValues();
        Alert.alert('ゲーム終了', 'お疲れ様でした。データが保存されました。');
      } catch (error) {
        console.error('Error saving data:', error);
        Alert.alert('エラー', 'データの保存に失敗しました。');
      } finally {
        router.replace('/login');
      }
    }
  }, [user, results, settings, signOut]);

  useEffect(() => {
    if (trialCount === totalTrials) {
      // Alert.alert(
      //   'ゲーム終了',
      //   'お疲れ様でした。ゲームが終了しました。',
      //   [
      //     {
      //       text: 'OK',
      //       onPress: handleGameEnd,
      //     },
      //   ],
      //   { cancelable: false }
      // );
      handleGameEnd();
    }
  }, [trialCount, totalTrials, handleGameEnd]);

  if (!settings || !results) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.trialCount}>
          {`${trialCount + 1}/${totalTrials}`}
        </Text>
      </View>

      <View style={styles.balloonContainer}>
        <Balloon />
      </View>

      <View style={styles.controlsContainer}>
        <PompButton />
        <CollectButton />
        <EarningsDisplay />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  trialCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  balloonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  controlsContainer: {
    padding: 20,
  },
});
