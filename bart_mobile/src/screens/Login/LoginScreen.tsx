import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../firebase/firebase';
import { useAuth } from '../../context/AuthProvider';
import { router } from 'expo-router';
import { ResultsContext } from '@/src/context/ResultsDataProvider';
import { GameContext } from '@/src/context/GameContextProvider';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth, isAuth, clearAuth } = useAuth();
  const { resetResults } = useContext(ResultsContext);
  const { resetGame } = useContext(GameContext);

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        // 認証が成功したらuidを使用してAuthを設定
        setAuth(user.uid, true, false);
        router.push('/instruction'); // インストラクションページへの遷移
      } catch (error) {
        console.error(error);
        Alert.alert(
          'ログインエラー',
          'メールアドレスまたはパスワードが正しくありません'
        );
      }
    } else {
      Alert.alert('エラー', 'メールアドレスとパスワードを入力してください');
    }
  };

  const handleDemo = async () => {
    resetResults();
    resetGame();
    setAuth('', false, true);
    router.push('/instruction'); // デモプレイ時もインストラクションページへ遷移
  };

  const navigateToSignup = () => {
    router.push('/signup');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.header}>サインイン画面</Text>
        <View style={styles.form}>
          <Text style={styles.label}>メールアドレス</Text>
          <TextInput
            style={styles.input}
            placeholder="メールアドレス"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>パスワード</Text>
          <TextInput
            style={styles.input}
            placeholder="パスワード"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>サインイン</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkContainer}
            onPress={navigateToSignup}
          >
            <Text style={styles.linkText}>
              アカウントをお持ちでない方はこちら
            </Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.demoButton} onPress={handleDemo}>
          <Text style={styles.buttonText}>デモプレイ</Text>
        </TouchableOpacity> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    marginBottom: 10,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  demoButton: {
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    maxWidth: 400,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
