"use client";
//ログイン情報を表示するコンポーネント
import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const AuthDisplay = () => {
  //ログイン情報を取得
  const [authInfo] = useCookies(["isAuth", "username"]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className="absolute top-4 left-4 mt-4 ml-4">
      <p className="text-2xl font-semibold text-black">
        {authInfo.isAuth ? `プレイ中：${authInfo.username}` : "デモプレイ中"}
      </p>
    </div>
  );
};
