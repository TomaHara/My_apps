import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  BackHandler,
  Platform,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Balloon } from './components/Balloon';
import { PompButton } from './components/PompButton';
import { CollectButton } from './components/CollectButton';
import { EarningsDisplay } from './components/EarningsDisplay';
import { SettingData } from '../../context/SettingDataProvider';
import { ResultsContext } from '../../context/ResultsDataProvider';
import { useAuth } from '../../context/AuthProvider';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { AuthDisplay } from '../../components/AuthDisplay';

const MainGameScreen: React.FC = () => {
  const settings = useContext(SettingData);
  const { results } = useContext(ResultsContext);
  const { username, isAuth, clearAuth } = useAuth();
  const trialCount = results.earnings.length;
  const totalTrials = settings.TrialBlocks * 10;
  const [isFinishModalVisible, setIsFinishModalVisible] = useState(false);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     if (!isAuth) return;

  //     const onBackPress = () => {
  //       if (!isFinishModalVisible) {
  //         Alert.alert(
  //           '警告',
  //           'ゲームを完了するまで前のページに戻ることはできません。',
  //           [{ text: 'OK' }]
  //         );
  //         return true;
  //       }
  //       return false;
  //     };

  //     if (Platform.OS === 'android') {
  //       BackHandler.addEventListener('hardwareBackPress', onBackPress);
  //     }

  //     router.addListener('beforeRemove', (e) => {
  //       if (!isFinishModalVisible) {
  //         e.preventDefault();
  //         onBackPress();
  //       }
  //     });

  //     return () => {
  //       if (Platform.OS === 'android') {
  //         BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //       }
  //     };
  //   }, [isAuth, isFinishModalVisible])
  // );

  const handleLogin = () => {
    router.push('/login');
  };

  useEffect(() => {
    if (trialCount === totalTrials) {
      setIsFinishModalVisible(true);
    }
  }, [trialCount, totalTrials]);

  const handleFinish = async () => {
    try {
      if (isAuth) {
        const docRef = collection(db, 'Shozemi', username, 'PlayData');
        await addDoc(docRef, {
          results,
          settings,
          gameCompleteTimestamp: serverTimestamp(),
        });
      }
      clearAuth();
      router.replace('/login');
    } catch (error) {
      Alert.alert('エラー', 'データの保存に失敗しました。');
      console.error('Error saving data:', error);
    }
  };

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

      <Modal
        visible={isFinishModalVisible}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              お疲れ様でした。ゲームが終了しました。
            </Text>
            <TouchableOpacity
              style={styles.finishButton}
              onPress={handleFinish}
            >
              <Text style={styles.finishButtonText}>ゲーム終了</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    maxWidth: '80%',
  },
  modalText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  finishButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainGameScreen;
