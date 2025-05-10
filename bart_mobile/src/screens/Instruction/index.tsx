import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';

export default function InstructionScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>BARTタスクの説明</Text>
        <View style={styles.card}>
          <Text style={styles.text}>
            このゲームは風船を膨らませて、できるだけ多くのお金を稼ぐゲームです。
          </Text>
          <Text style={styles.text}>
            +1、+3、+10のボタンで風船を膨らませると、その分のお金が一時的に貯まります。
            ただし、風船は一定の確率で破裂します。風船が破裂すると、その回で貯めたお金はすべて失われてしまいます。
          </Text>
          <Text style={styles.text}>
            回収ボタンを押すと、その時点で貯まっているお金を確定することができます。
          </Text>
          <Text style={styles.text}>
            このゲームは全部で30回行います。できるだけ多くのお金を貯めることを目指してください。
          </Text>
          <Text style={[styles.text, styles.warning]}>
            アプリを終了してしまうとプレイデータが消えて最初からやり直しになってしまうので気をつけてください。
          </Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/mainGame')}
      >
        <Text style={styles.buttonText}>ゲームを始める</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
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
