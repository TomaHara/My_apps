import React, { useState } from 'react';
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
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { useAuth } from '../context/AuthProvider';
import { router } from 'expo-router';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setAuth } = useAuth();

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('エラー', '全ての項目を入力してください');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('エラー', 'パスワードが一致しません');
      return;
    }

    try {
      // Firebase Authでアカウント作成
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firestoreにユーザー情報を保存
      await setDoc(doc(db, 'Shozemi', user.uid), {
        email: email,
        createdAt: new Date(),
      });

      // ログイン状態を設定
      setAuth(user.uid, true, false);

      Alert.alert('成功', 'アカウントが作成されました', [
        { text: 'OK', onPress: () => router.push('/instruction') },
      ]);
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof Error && 'code' in error) {
        const errorCode = (error as { code: string }).code;
        if (errorCode === 'auth/email-already-in-use') {
          Alert.alert('エラー', 'このメールアドレスは既に使用されています');
        } else if (errorCode === 'auth/invalid-email') {
          Alert.alert('エラー', '無効なメールアドレス形式です');
        } else if (errorCode === 'auth/weak-password') {
          Alert.alert(
            'エラー',
            'パスワードが弱すぎます。6文字以上にしてください'
          );
        } else {
          Alert.alert('エラー', '登録に失敗しました');
        }
      } else {
        Alert.alert('エラー', '予期しないエラーが発生しました');
      }
    }
  };

  const navigateToLogin = () => {
    router.push('/');
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.header}>アカウント作成</Text>
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
            placeholder="パスワード (6文字以上)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.label}>パスワード (確認)</Text>
          <TextInput
            style={styles.input}
            placeholder="パスワード (確認)"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>アカウント作成</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkContainer}
            onPress={navigateToLogin}
          >
            <Text style={styles.linkText}>
              既にアカウントをお持ちの方はこちら
            </Text>
          </TouchableOpacity>
        </View>
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
