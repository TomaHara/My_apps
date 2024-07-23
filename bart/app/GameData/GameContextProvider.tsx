"use client";
import React, { createContext, useContext, useState } from "react";

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
};

export const GameContext = createContext({} as InitialState);

export const GameContextProvider: React.FC<Props> = ({ children }) => {
  const initialValues = {
    trialCount: 1,
    pompCount: 0,
    temporarySavings: 0,
  };
  const [values, setValues] = useState(initialValues);
  return (
    <GameContext.Provider value={{ values, setValues }}>
      {children}
    </GameContext.Provider>
  );
};
