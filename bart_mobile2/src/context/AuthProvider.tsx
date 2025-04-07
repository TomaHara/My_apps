import React, { createContext, useState, useContext } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  //   const auth = getAuth();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [auth]);

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
