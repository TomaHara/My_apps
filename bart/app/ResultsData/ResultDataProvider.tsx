"use client";
import React, { createContext, useContext, useState } from "react";

export interface ResultsData {
  earnings: number[]; // 獲得金額
  isBurst: boolean[]; // 破裂したかどうか
  pompCount: number[]; // 膨らませた回数
}
// 各風船のデータを表すインターフェースを定義
export interface ResultsDataContext {
  results: ResultsData;
  addResultsData: (
    earnings: number,
    isBurst: boolean,
    pompCount: number
  ) => void;
}
type Props = {
  children: React.ReactNode;
};

// // すべての風船が終わった後にデータを送信する関数
// function sendData() {
//   // ここでデータを送信する処理を行う
//   // 例: console.logを使用してデータを表示
//   console.log(JSON.stringify(balloonsData));
// }

// // データ送信を呼び出す例
// sendData();

export const ResultsContext = createContext({} as ResultsDataContext);

export const ResultsContextProvider: React.FC<Props> = ({ children }) => {
  const [results, setResults] = useState<ResultsData>({
    earnings: [],
    isBurst: [],
    pompCount: [],
  });

  const addResultsData = (
    earnings: number,
    isBurst: boolean,
    pompCount: number
  ) => {
    setResults((prevResults) => ({
      earnings: [...prevResults.earnings, earnings],
      isBurst: [...prevResults.isBurst, isBurst],
      pompCount: [...prevResults.pompCount, pompCount],
    }));
  };

  return (
    <ResultsContext.Provider value={{ results, addResultsData }}>
      {children}
    </ResultsContext.Provider>
  );
};
