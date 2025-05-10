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

// 環境変数から Firebase 設定を取得
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

export default auth;
export { db };
