import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ResultsContext } from '../../src/context/ResultsDataProvider';
import { db } from '../../src/firebase/firebase';
import { useAuth } from '../../src/context/AuthProvider';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { SettingData } from '../../src/context/SettingDataProvider';
import { GameContext } from '../../src/context/GameContextProvider';

type TaskStress =
  | '大幅に軽く感じた'
  | 'やや軽く感じた'
  | '変わらない'
  | 'やや重く感じた'
  | '大幅に重く感じた';

export default function TaskQuestionnairePage() {
  const [selectedStress, setSelectedStress] = useState<TaskStress | null>(null);
  const router = useRouter();
  const settings = useContext(SettingData);
  const { results, resetResults, setTaskStress, questionnaire } =
    useContext(ResultsContext);
  const { resetValues } = useContext(GameContext);
  const { user, signOut } = useAuth();

  const options: TaskStress[] = [
    '大幅に軽く感じた',
    'やや軽く感じた',
    '変わらない',
    'やや重く感じた',
    '大幅に重く感じた',
  ];

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        Alert.alert('タスクを完了するまで戻れません。', '', [
          {
            text: 'OK',
            onPress: () => null,
            style: 'cancel',
          },
        ]);
        return true;
      }
    );

    // コンポーネントがアンマウントされるときリスナーを解除
    return () => backHandler.remove();
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!selectedStress) {
      Alert.alert('エラー', 'タスクの負荷を選択してください');
      return;
    }
    setTaskStress(selectedStress);
    if (user) {
      try {
        await addDoc(collection(db, 'Shozemi', user.uid, 'TaskData'), {
          results,
          questionnaire,
          taskCompleteTimestamp: serverTimestamp(),
        });
        //   await addDoc(
        //     collection(db, 'Shozemi', user.uid, 'QuestionnaireData'),
        //     {
        //       questionnaire,
        //     }
        //   );
        resetResults();
        resetValues();
      } catch (error) {
        console.error('Error saving data:', error);
        Alert.alert('エラー', 'データの保存に失敗しました。');
      } finally {
        router.push('/login');
      }
    }
  }, [user, results, settings, signOut, selectedStress]);

  //   const handleSubmit = () => {
  //     if (selectedStress) {
  //       setTaskStress(selectedStress);
  //       router.push('/mainGame'); // 次のページに遷移
  //     } else {
  //       Alert.alert('エラー', 'タスクの負荷を選択してください');
  //     }
  //   };

  const RadioButton = ({ isSelected }: { isSelected: boolean }) => (
    <View
      style={[styles.radioButton, isSelected && styles.radioButtonSelected]}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.question}>
          昨日と比べて、今日のタスクの負荷はどうでしたか？
        </Text>

        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionContainer,
                selectedStress === option && styles.selectedOptionContainer,
              ]}
              onPress={() => {
                console.log('Option selected:', option);
                setSelectedStress(option);
              }}
            >
              <RadioButton isSelected={selectedStress === option} />
              <Text
                style={[
                  styles.optionText,
                  selectedStress === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.submitButtonText}>終了</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    padding: 20,
    marginHorizontal: 20,
  },
  headerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  question: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    color: '#1a1a1a',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectedOptionContainer: {
    backgroundColor: '#f0f7ff',
  },
  radioButton: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  radioButtonSelected: {
    borderColor: '#007AFF',
    borderWidth: 7,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
    alignSelf: 'center',
    width: '50%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
