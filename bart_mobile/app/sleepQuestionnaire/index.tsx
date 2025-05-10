import React, { useEffect, useState, useContext } from 'react';
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
import { useAuth } from '../../src/context/AuthProvider';
import { useLanguage } from '../../src/context/LanguageProvider';
import { translations } from '../../src/assets/translations';

export default function SleepQuestionnairePage() {
  const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
  const router = useRouter();
  const { setSleepQuality } = useContext(ResultsContext);
  const { signOut } = useAuth();
  const { language } = useLanguage();

  // 言語に応じたテキストを取得
  const t = translations.sleepQuestionnaire[language];
  const options = t.options;

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

  const handleSubmit = () => {
    if (selectedQuality) {
      setSleepQuality(selectedQuality);
      router.push('/mainGame'); // 次のページに遷移
    } else {
      Alert.alert(t.error, t.errorMessage);
    }
  };

  const RadioButton = ({ isSelected }: { isSelected: boolean }) => (
    <View
      style={[styles.radioButton, isSelected && styles.radioButtonSelected]}
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.question}>{t.question}</Text>

        <View style={styles.optionsContainer}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionContainer,
                selectedQuality === option && styles.selectedOptionContainer,
              ]}
              onPress={() => setSelectedQuality(option)}
            >
              <RadioButton isSelected={selectedQuality === option} />
              <Text
                style={[
                  styles.optionText,
                  selectedQuality === option && styles.selectedOptionText,
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
          <Text style={styles.submitButtonText}>{t.next}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={async () => {
            await signOut();
            router.replace('/login');
          }}
        >
          <Text style={styles.linkText}>{t.logout}</Text>
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
  linkButton: {
    marginTop: 20,
    padding: 10,
  },
  linkText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});
