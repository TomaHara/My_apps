// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Keyboard,
// } from 'react-native';
// import { router } from 'expo-router';
// import { useAuth } from '../../context/AuthProvider';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import { SafeAreaView } from 'react-native-safe-area-context';

// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { signIn, isLoading, error, clearError } = useAuth();

//   const handleLogin = async () => {
//     try {
//       await signIn(email, password);
//       router.push('/instruction');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDemo = () => {
//     router.push('/instruction');
//   };

//   return (
//     <SafeAreaView>
//       <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//         <View style={styles.container}>
//           <Text style={styles.title}>BARTタスク</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="メールアドレス"
//             value={email}
//             onChangeText={setEmail}
//             autoCapitalize="none"
//             keyboardType="email-address"
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="パスワード"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//           />

//           {error && <Text style={styles.error}>{error}</Text>}

//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleLogin}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <ActivityIndicator color="#fff" />
//             ) : (
//               <Text style={styles.buttonText}>ログイン</Text>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.linkButton}
//             onPress={() => {
//               clearError();
//               router.push('/signup');
//             }}
//           >
//             <Text style={styles.linkText}>新規登録はこちら</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.demoButton} onPress={handleDemo}>
//             <Text style={styles.buttonText}>デモプレイ</Text>
//           </TouchableOpacity>
//         </View>
//       </TouchableWithoutFeedback>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#007AFF',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   demoButton: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#34C759',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   linkButton: {
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   linkText: {
//     color: '#007AFF',
//     fontSize: 16,
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthProvider';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, error } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    // try {
    //   await signIn(email, password);
    //   router.replace('/instruction');
    // } catch (err) {
    //   console.error('Login failed:', err);
    // }
    if (!email || !password) {
      Alert.alert('メールアドレスとパスワードを入力してください');
      return;
    }
    try {
      const result = await signIn(email, password);
      if (result.isSuccess) {
        router.replace('/mainGame');
      } else if (result.errorCode === 'auth/invalid-email') {
        Alert.alert(
          'エラー',
          'メールアドレスまたはパスワードが正しくありません'
        );
      } else if (result.errorCode === 'auth/invalid-credential') {
        Alert.alert(
          'エラー',
          'メールアドレスまたはパスワードが正しくありません'
        );
      }
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('エラー', '予期しないエラーが発生しました' + error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>ログイン</Text>
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="メールアドレス"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TextInput
              style={styles.input}
              placeholder="パスワード"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>ログイン</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => router.push('/signup')}
            >
              <Text style={styles.linkText}>アカウントをお持ちでない方</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  form: {
    width: '100%',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 20,
    padding: 10,
  },
  linkText: {
    color: '#007AFF',
    textAlign: 'center',
    fontSize: 14,
  },
});
