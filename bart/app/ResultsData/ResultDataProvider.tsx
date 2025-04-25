'use client';
import { FieldValue, serverTimestamp } from 'firebase/firestore';
import React, { createContext, useContext, useState } from 'react';
import { Timestamp } from 'firebase/firestore';

export interface ResultsData {
  earnings: number[]; // 獲得金額
  isBurst: boolean[]; // 破裂したかどうか
  pompCount: number[]; // 膨らませた回数
  // isChallenged: boolean[]; // ダブルチャンスに挑戦したかどうか
  // isSucceeded: (boolean | null)[]; // ダブルチャンスに成功したかどうか
  totalEarnings: number; // 総獲得金額
  // balloonEndTimestamp: Timestamp[]; //各風船終了時のタイムスタンプ
}
// 各風船のデータを表すインターフェースを定義
export interface ResultsDataContext {
  results: ResultsData;
  addResultsData: (
    earnings: number,
    isBurst: boolean,
    pompCount: number,
    totalEarnings: number
    // balloonEndTimestamp: Timestamp
  ) => void;
  addTotalEarnings: (totalEarnings: number) => void;
  // addIsChallenged: (isChallenged: boolean) => void;
  // addIsSucceeded: (isSucceeded: boolean | null) => void;
}
type Props = {
  children: React.ReactNode;
};

export const ResultsContext = createContext({} as ResultsDataContext);

export const ResultsContextProvider: React.FC<Props> = ({ children }) => {
  const [results, setResults] = useState<ResultsData>({
    earnings: [],
    isBurst: [],
    pompCount: [],
    // balloonEndTimestamp: [],
    // isChallenged: [],
    // isSucceeded: [],
    totalEarnings: 0,
  });

  const addResultsData = (
    earnings: number,
    isBurst: boolean,
    pompCount: number,
    totalEarnings: number
    // balloonEndTimestamp: Timestamp
  ) => {
    setResults((prevResults) => ({
      ...prevResults,
      earnings: [...prevResults.earnings, earnings],
      isBurst: [...prevResults.isBurst, isBurst],
      pompCount: [...prevResults.pompCount, pompCount],
      totalEarnings: totalEarnings,
      // balloonEndTimestamp: [
      //   ...prevResults.balloonEndTimestamp,
      //   balloonEndTimestamp,
      // ],
    }));
  };

  const addTotalEarnings = (totalEarnings: number) => {
    setResults((prevResults) => ({
      ...prevResults,
      totalEarnings: totalEarnings,
    }));
  };

  // const addIsChallenged = (isChallenged: boolean) => {
  //   setResults((prevResults) => ({
  //     ...prevResults,
  //     isChallenged: [...prevResults.isChallenged, isChallenged],
  //   }));
  // };

  // const addIsSucceeded = (isSucceeded: boolean | null) => {
  //   setResults((prevResults) => ({
  //     ...prevResults,
  //     isSucceeded: [...prevResults.isSucceeded, isSucceeded],
  //   }));
  // };

  return (
    <ResultsContext.Provider
      value={{
        results,
        addResultsData,
        addTotalEarnings,
        // addIsChallenged,
        // addIsSucceeded,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};
