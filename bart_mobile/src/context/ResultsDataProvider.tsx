import React, { createContext, useState } from 'react';
import { Timestamp } from 'firebase/firestore';

export interface ResultsData {
  earnings: number[];
  isBurst: boolean[];
  pompCount: number[];
  totalEarnings: number;
  balloonEndTimestamp: Timestamp[];
}

export interface ResultsDataContext {
  results: ResultsData;
  addResultsData: (
    earnings: number,
    isBurst: boolean,
    pompCount: number,
    totalEarnings: number,
    balloonEndTimestamp: Timestamp
  ) => void;
  addTotalEarnings: (totalEarnings: number) => void;
  resetResults: () => void; // 追加
}

type Props = {
  children: React.ReactNode;
};

export const ResultsContext = createContext({} as ResultsDataContext);

export const ResultsContextProvider: React.FC<Props> = ({ children }) => {
  const initialResults = {
    earnings: [],
    isBurst: [],
    pompCount: [],
    balloonEndTimestamp: [],
    totalEarnings: 0,
  };

  const [results, setResults] = useState<ResultsData>(initialResults);

  const addResultsData = (
    earnings: number,
    isBurst: boolean,
    pompCount: number,
    totalEarnings: number,
    balloonEndTimestamp: Timestamp
  ) => {
    setResults((prevResults) => ({
      ...prevResults,
      earnings: [...prevResults.earnings, earnings],
      isBurst: [...prevResults.isBurst, isBurst],
      pompCount: [...prevResults.pompCount, pompCount],
      totalEarnings: totalEarnings,
      balloonEndTimestamp: [
        ...prevResults.balloonEndTimestamp,
        balloonEndTimestamp,
      ],
    }));
  };

  const addTotalEarnings = (totalEarnings: number) => {
    setResults((prevResults) => ({
      ...prevResults,
      totalEarnings: totalEarnings,
    }));
  };

  const resetResults = () => {
    setResults(initialResults);
  };

  return (
    <ResultsContext.Provider
      value={{
        results,
        addResultsData,
        addTotalEarnings,
        resetResults, // 追加
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};
