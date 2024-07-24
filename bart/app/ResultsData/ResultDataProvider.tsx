"use client";
import { FieldValue, serverTimestamp } from "firebase/firestore";
import React, { createContext, useContext, useState } from "react";
import { Timestamp } from "firebase/firestore";

export interface ResultsData {
  earnings: number[]; // 獲得金額
  isBurst: boolean[]; // 破裂したかどうか
  pompCount: number[]; // 膨らませた回数
  balloonEndTimestamp: Timestamp[]; //各風船終了時のタイムスタンプ
}
// 各風船のデータを表すインターフェースを定義
export interface ResultsDataContext {
  results: ResultsData;
  addResultsData: (
    earnings: number,
    isBurst: boolean,
    pompCount: number,
    balloonEndTimestamp: Timestamp
  ) => void;
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
    balloonEndTimestamp: [],
  });

  const addResultsData = (
    earnings: number,
    isBurst: boolean,
    pompCount: number,
    balloonEndTimestamp: Timestamp
  ) => {
    setResults((prevResults) => ({
      earnings: [...prevResults.earnings, earnings],
      isBurst: [...prevResults.isBurst, isBurst],
      pompCount: [...prevResults.pompCount, pompCount],
      balloonEndTimestamp: [
        ...prevResults.balloonEndTimestamp,
        balloonEndTimestamp,
      ],
    }));
  };

  return (
    <ResultsContext.Provider value={{ results, addResultsData }}>
      {children}
    </ResultsContext.Provider>
  );
};
