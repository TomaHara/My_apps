import React, { useContext, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  Platform,
  BackHandler,
} from 'react-native';
import { router } from 'expo-router';
import { GameContext } from '../../context/GameContextProvider';
import { SettingData } from '../../context/SettingDataProvider';
import { ResultsContext } from '../../context/ResultsDataProvider';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useAuth } from '../../context/AuthProvider';
import { useLanguage } from '../../context/LanguageProvider';
import { translations } from '../../assets/translations';
import { Balloon } from './components/Balloon';
import { PompButton } from './components/PompButton';
import { CollectButton } from './components/CollectButton';
import { EarningsDisplay } from './components/EarningsDisplay';

export default function MainGameScreen() {
  const settings = useContext(SettingData);
  const { results, resetResults } = useContext(ResultsContext);
  const { resetValues } = useContext(GameContext);
  const { user, signOut } = useAuth();
  const { language } = useLanguage();

  // 言語に応じたテキストを取得
  const t = translations.mainGame[language];

  const trialCount = results.earnings.length;
  const totalTrials = settings.TrialBlocks * 10;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Alert.alert(t.backButtonAlert, '', [
          {
            text: t.ok,
            onPress: () => null,
            style: 'cancel',
          },
        ]);
        return true;
      }
    );

    // コンポーネントがアンマウントされるときリスナーを解除
    return () => backHandler.remove();
  }, [t]);

  useEffect(() => {
    if (trialCount === totalTrials) {
      router.replace('/taskQuestionnaire');
    }
  }, [trialCount, totalTrials]);

  if (!settings || !results) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <EarningsDisplay /> */}
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
