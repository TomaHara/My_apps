import React, { createContext, useState } from 'react';
import { Timestamp } from 'firebase/firestore';

export interface ResultsData {
  earnings: number[];
  isBurst: boolean[];
  pompCount: number[];
  totalEarnings: number;
  balloonEndTimestamp: Timestamp[];
}

export interface Questionnaire {
  sleepQuality: string;
  taskStress: string;
}

export interface ResultsDataContext {
  results: ResultsData;
  questionnaire: Questionnaire;
  addResultsData: (
    earnings: number,
    isBurst: boolean,
    pompCount: number,
    totalEarnings: number
  ) => void;
  resetResults: () => void;
  setSleepQuality: (sleepQuality: string) => void;
  setTaskStress: (taskStress: string) => void;
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
  const [questionnaire, setQuestionnaire] = useState<Questionnaire>({
    sleepQuality: '',
    taskStress: '',
  });

  const addResultsData = (
    earnings: number,
    isBurst: boolean,
    pompCount: number,
    totalEarnings: number
  ) => {
    setResults((prevResults) => ({
      ...prevResults,
      earnings: [...prevResults.earnings, earnings],
      isBurst: [...prevResults.isBurst, isBurst],
      pompCount: [...prevResults.pompCount, pompCount],
      totalEarnings: totalEarnings,
    }));
  };

  const resetResults = () => {
    setResults(initialResults);
  };

  const setSleepQuality = (sleepQuality: string) => {
    setQuestionnaire((prevQuestionnaire) => ({
      ...prevQuestionnaire,
      sleepQuality: sleepQuality,
    }));
  };
  const setTaskStress = (taskStress: string) => {
    setQuestionnaire((prevQuestionnaire) => ({
      ...prevQuestionnaire,
      taskStress: taskStress,
    }));
  };

  return (
    <ResultsContext.Provider
      value={{
        results,
        addResultsData,
        resetResults,
        questionnaire,
        setSleepQuality,
        setTaskStress,
      }}
    >
      {children}
    </ResultsContext.Provider>
  );
};
