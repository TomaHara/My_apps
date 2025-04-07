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
  resetResults: () => void;
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

  const resetResults = () => {
    setResults(initialResults);
  };

  return (
    <ResultsContext.Provider value={{ results, addResultsData, resetResults }}>
      {children}
    </ResultsContext.Provider>
  );
};
