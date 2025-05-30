// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Platform,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { useAuth } from '../../src/context/AuthProvider';
// import { StatusBar } from 'expo-status-bar';

// export default function LoginScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { signIn, error } = useAuth();
//   const router = useRouter();

//   const handleLogin = async () => {
//     try {
//       await signIn(email, password);
//       router.replace('/');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar style="dark" />
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.title}>ログイン</Text>
//           {error && <Text style={styles.errorText}>{error}</Text>}
//         </View>

//         <View style={styles.form}>
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

//           <TouchableOpacity style={styles.button} onPress={handleLogin}>
//             <Text style={styles.buttonText}>ログイン</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.linkButton}
//             onPress={() => router.push('/signup')}
//           >
//             <Text style={styles.linkText}>アカウントをお持ちでない方</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//     paddingTop: Platform.OS === 'android' ? 50 : 0,
//   },
//   header: {
//     alignItems: 'center',
//     marginVertical: 30,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   form: {
//     width: '100%',
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     height: 50,
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   errorText: {
//     color: 'red',
//     marginTop: 5,
//     textAlign: 'center',
//   },
//   linkButton: {
//     marginTop: 20,
//     padding: 10,
//   },
//   linkText: {
//     color: '#007AFF',
//     textAlign: 'center',
//     fontSize: 14,
//   },
// });

import LoginScreen from '../../src/screens/Login';

export default function Page() {
  return <LoginScreen />;
}
