import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../src/context/LanguageProvider';
import { StatusBar } from 'expo-status-bar';

export default function SelectLanguageScreen() {
  const router = useRouter();
  const { setLanguage } = useLanguage();

  const handleSelectLanguage = (language: 'ja' | 'en') => {
    // 選択された言語を保存
    setLanguage(language);
    console.log('Selected language:', language);
    router.push('/sleepQuestionnaire'); // 睡眠アンケート画面へ遷移
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>言語を選択してください</Text>
          <Text style={styles.subtitle}>Select Language</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => handleSelectLanguage('ja')}
          >
            <View style={styles.languageTextContainer}>
              <Text style={styles.languageName}>日本語</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.languageButton}
            onPress={() => handleSelectLanguage('en')}
          >
            <View style={styles.languageTextContainer}>
              <Text style={styles.languageName}>English</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eaeaea',
  },
  flagEmoji: {
    fontSize: 30,
    width: 50,
    textAlign: 'center',
  },
  languageTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  languageName: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  languageNameSub: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
    textAlign: 'center',
  },
});
