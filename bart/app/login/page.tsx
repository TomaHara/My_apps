//ログインページ
'use client';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

const LoginForm = () => {
  const [username, setUserName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [authInfo, setCookie, removeCookie] = useCookies([
    'isAuth',
    'username',
    'isDemo',
  ]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    console.log(username);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username) {
      const docRef = doc(db, 'Users', username);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('User exists');
        setCookie('isAuth', true);
        setCookie('username', username);
        setCookie('isDemo', false);
        setErrorMessage('');
        router.push('/instruction');
      } else {
        console.log('No such user!');
        setErrorMessage('登録されていません');
        setCookie('isAuth', false);
        removeCookie('username');
        console.log(authInfo.isAuth);
      }
    } else {
      setErrorMessage('参加者IDを入力してください');
      setCookie('isAuth', false);
      removeCookie('username');
      console.log(authInfo.isAuth);
    }
  };

  const handleClick = () => {
    setCookie('isAuth', false);
    setCookie('isDemo', true);
    router.push('/instruction');
  };

  return (
    <div className=" bg-gray-100 flex flex-col items-center justify-center min-h-screen">
      <header className="text-2xl font-bold mb-4 text-black">
        サインイン画面
      </header>
      <main className="max-w-md p-4 bg-white rounded shadow">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label className="mb-2">参加者IDを入力してください。</label>
          <input
            type="text"
            placeholder="参加者ID"
            name="username"
            onChange={(e) => handleChange(e)}
            className="w-full px-4 py-2 mb-2 border border-gray-300 rounded text-black"
          />
          <p className="text-red-500">
            {errorMessage}
            {authInfo.isAuth}
          </p>
          <button
            type="submit"
            className="w-full px-4 py-2 mb-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            サインイン
          </button>
        </form>
      </main>
      <button
        onClick={() => handleClick()}
        className="max-w-md px-4 py-2 mt-10 text-white bg-gray-500 rounded hover:bg-gray-600"
      >
        デモプレイ
      </button>
    </div>
  );
};

export default function LoginPage() {
  return <LoginForm />;
}
