import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  initializeAuth,
  Auth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

// const firebaseConfig = {
//   appiKey: 'AIzaSyBhVcQF67rhIVT2JgyhtZJDZ1nQmj-PDBI',
//   authDomain: 'my-apps-99715.firebaseapp.com',
//   projectId: 'my-apps-99715',
//   storageBucket: 'my-apps-99715.appspot.com',
//   messagingSenderId: '1037775522319',
//   appId: '1:1037775522319:web:7ac41c1d3af0b9dd5b717a',
// };

// const firebaseConfig = {
//   appiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyBhVcQF67rhIVT2JgyhtZJDZ1nQmj-PDBI',
  authDomain: 'my-apps-99715.firebaseapp.com',
  projectId: 'my-apps-99715',
  storageBucket: 'my-apps-99715.appspot.com',
  messagingSenderId: '1037775522319',
  appId: '1:1037775522319:web:7ac41c1d3af0b9dd5b717a',
  measurementId: 'G-35HS7XZ1B5',
};

// Firebaseの初期化
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth インスタンスを取得
const auth: Auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore インスタンスを取得
const db = getFirestore(app);

// export { auth, db };
export default auth;
export { db };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBhVcQF67rhIVT2JgyhtZJDZ1nQmj-PDBI",
//   authDomain: "my-apps-99715.firebaseapp.com",
//   projectId: "my-apps-99715",
//   storageBucket: "my-apps-99715.appspot.com",
//   messagingSenderId: "1037775522319",
//   appId: "1:1037775522319:web:7ac41c1d3af0b9dd5b717a",
//   measurementId: "G-35HS7XZ1B5"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
