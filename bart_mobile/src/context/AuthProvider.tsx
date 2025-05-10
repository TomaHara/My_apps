import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '../firebase/firebase';
import { db } from '../firebase/firebase';

type Result = {
  isSuccess: boolean;
  errorMessage?: string;
  errorCode?: string;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<Result>;
  signUp: (email: string, password: string) => Promise<Result>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Firebase Auth の状態監視
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          console.log('Auth state changed:', currentUser?.email);
          if (currentUser) {
            // ユーザー情報をAsyncStorageに保存
            await AsyncStorage.setItem(
              'user',
              JSON.stringify({
                email: currentUser.email,
                uid: currentUser.uid,
              })
            );
            setUser(currentUser);
          } else {
            // ユーザー情報を削除
            await AsyncStorage.removeItem('user');
            setUser(null);
          }
          setIsLoading(false);
        });

        // 初期化時にAsyncStorageからユーザー情報を読み込む
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          console.log('Loaded user from storage:', userData.email);
        }

        return () => unsubscribe();
      } catch (error) {
        console.error('Auth initialization error:', error);
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<Result> => {
    try {
      setIsLoading(true);
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      return { isSuccess: true };
    } catch (error: any) {
      setError(error.message);
      return {
        isSuccess: false,
        errorMessage: error.message,
        errorCode: error.code,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<Result> => {
    try {
      setIsLoading(true);
      setError(null);
      // ユーザーを作成
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Shozemiコレクションにユーザードキュメントを作成
      await setDoc(doc(db, 'Shozemi', userCredential.user.uid), {
        email: email,
        createdAt: new Date().toISOString(),
      });

      return { isSuccess: true };
    } catch (error: any) {
      setError(error.message);
      return {
        isSuccess: false,
        errorMessage: error.message,
        errorCode: error.code,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await firebaseSignOut(auth);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        signIn,
        signUp,
        signOut,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
