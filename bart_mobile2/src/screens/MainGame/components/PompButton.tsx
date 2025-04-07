import { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SettingData } from '../../../context/SettingDataProvider';
import { GameContext } from '../../../context/GameContextProvider';
import { ResultsContext } from '../../../context/ResultsDataProvider';
import { Timestamp } from 'firebase/firestore';
import * as Haptics from 'expo-haptics';
import { BurstModal } from './BurstModal';

export const PompButton = () => {
  const { gainPerPush, maxBurstPoint, minBurstPoint, TrialBlocks } =
    useContext(SettingData);
  const { values, setValues } = useContext(GameContext);
  const { results, addResultsData } = useContext(ResultsContext);
  const [burstPoints, setBurstPoints] = useState<number[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [burstModalVisible, setBurstModalVisible] = useState(false);

  const generateRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const adjustBlockAverage = (
    arr: number[],
    blockSize: number,
    targetAverage: number
  ): number[] => {
    const adjustedArr = [...arr];
    for (let i = 0; i < arr.length; i += blockSize) {
      let block = adjustedArr.slice(i, i + blockSize);
      let blockSum = block.reduce((sum, num) => sum + num, 0);

      if (blockSum > targetAverage * blockSize) {
        let excess = blockSum - targetAverage * blockSize;
        let sortedBlock = [...block].sort((a, b) => b - a);
        block[block.indexOf(sortedBlock[0])] -= excess;
      }

      if (blockSum < targetAverage * blockSize) {
        let deficit = targetAverage * blockSize - blockSum;
        let sortedBlock = [...block].sort((a, b) => a - b);
        block[block.indexOf(sortedBlock[0])] += deficit;
      }

      for (let j = 0; j < block.length; j++) {
        adjustedArr[i + j] = block[j];
      }
    }
    return adjustedArr;
  };

  const generateBurstPoints = (
    TrialBlocks: number,
    minBurstPoint: number,
    maxBurstPoint: number
  ): number[] => {
    const burstPoints: number[] = [];
    for (let i = 0; i < TrialBlocks; i++) {
      let blockSum = 0;
      let block = [];
      while (blockSum <= 540 || blockSum >= 740) {
        block = [];
        for (let j = 0; j < 10; j++) {
          block.push(generateRandomInt(minBurstPoint, maxBurstPoint));
        }
        blockSum = block.reduce((sum, num) => sum + num, 0);
      }
      burstPoints.push(...block);
    }
    return adjustBlockAverage(burstPoints, 10, maxBurstPoint / 2);
  };

  useEffect(() => {
    setBurstPoints(
      generateBurstPoints(TrialBlocks, minBurstPoint, maxBurstPoint)
    );
  }, []);

  const handlePomp = (increment: number) => {
    if (buttonDisabled) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setValues((prevValues) => ({
      ...prevValues,
      pompCount: prevValues.pompCount + increment,
      temporarySavings: prevValues.temporarySavings + gainPerPush * increment,
    }));

    if (values.pompCount + increment >= burstPoints[values.trialCount - 1]) {
      setButtonDisabled(true);
      setBurstModalVisible(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      addResultsData(
        0,
        true,
        values.pompCount + increment,
        results.totalEarnings,
        Timestamp.fromMillis(Date.now())
      );
      setValues((prevValues) => ({
        ...prevValues,
        trialCount: prevValues.trialCount + 1,
        pompCount: 0,
        temporarySavings: 0,
      }));
    }
  };

  const handleModalClose = () => {
    setBurstModalVisible(false);
    setButtonDisabled(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonBlue]}
          onPress={() => handlePomp(1)}
          disabled={buttonDisabled}
        >
          <Text style={styles.buttonText}>+1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonGreen]}
          onPress={() => handlePomp(3)}
          disabled={buttonDisabled}
        >
          <Text style={styles.buttonText}>+3</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonRed]}
          onPress={() => handlePomp(10)}
          disabled={buttonDisabled}
        >
          <Text style={styles.buttonText}>+10</Text>
        </TouchableOpacity>
      </View>

      <BurstModal visible={burstModalVisible} onClose={handleModalClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
  buttonBlue: {
    backgroundColor: '#007AFF',
  },
  buttonGreen: {
    backgroundColor: '#34C759',
  },
  buttonRed: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
