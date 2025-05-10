import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

type InitialState = {
  values: {
    trialCount: number;
    pompCount: number;
    temporarySavings: number;
  };
  setValues: React.Dispatch<
    React.SetStateAction<{
      trialCount: number;
      pompCount: number;
      temporarySavings: number;
    }>
  >;
  resetValues: () => void;
};

export const GameContext = createContext({} as InitialState);

export const useGame = () => {
  return useContext(GameContext);
};

export const GameContextProvider: React.FC<Props> = ({ children }) => {
  const initialValues = {
    trialCount: 1,
    pompCount: 0,
    temporarySavings: 0,
  };
  const [values, setValues] = useState(initialValues);
  const resetValues = () => {
    setValues(initialValues);
  };

  return (
    <GameContext.Provider value={{ values, setValues, resetValues }}>
      {children}
    </GameContext.Provider>
  );
};
