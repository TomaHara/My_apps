'use client';
//ログイン情報を表示するコンポーネント
import React from 'react';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';

export const AuthDisplay = () => {
  //ログイン情報を取得
  const [authInfo, setCookie, removeCookie] = useCookies([
    'isAuth',
    'username',
    'isDemo',
  ]);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    removeCookie('isAuth');
    removeCookie('username');
    removeCookie('isDemo');
    router.push('/login');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full flex justify-between items-center p-4 z-10">
      <div>
        <p className="text-2xl font-semibold text-black">
          {authInfo.isAuth ? `Player：${authInfo.username}` : 'Demo Player'}
        </p>
      </div>
      <div>
        {authInfo.isAuth ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Log In
          </button>
        )}
      </div>
    </div>
  );
};
