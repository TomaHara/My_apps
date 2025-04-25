import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useAuth } from '../../context/AuthProvider';
import { router } from 'expo-router';
import { AuthDisplay } from '../../components/AuthDisplay';

export default function InstructionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <AuthDisplay /> */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.title}>チュートリアル</Text>
          <Text style={styles.text}>
            このゲームは風船を膨らませて、できるだけ多くのお金を稼ぐゲームです。
            「空気を入れる」ボタンで風船を膨らませれば膨らませるほど一時的にお金がたまり、破裂する前に「回収」ボタンを押すことでお金を獲得できます。
          </Text>
          <Text style={styles.text}>
            しかし、風船を膨らませすぎて破裂させてしまった場合、一時的に貯めたお金は獲得できません。
          </Text>
          <Text style={[styles.text, styles.warning]}>
            アプリを終了してしまうとプレイデータが消えて最初からやり直しになってしまうので気をつけてください。
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/mainGame')}
        >
          <Text style={styles.buttonText}>ゲーム開始</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#000',
  },
  warning: {
    color: '#ff0000',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
