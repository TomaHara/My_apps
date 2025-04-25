'use client';
import React, { createContext } from 'react';
import { useCookies } from 'react-cookie';

type Props = {
  children: React.ReactNode;
};

interface Setting {
  TrialBlocks: number;
  gainPerPush: number;
  maxBurstPoint: number;
  minBurstPoint: number;
}

const defaultSettings: Setting = {
  TrialBlocks: 100,
  gainPerPush: 5,
  maxBurstPoint: 128,
  minBurstPoint: 1,
};

export const SettingData = createContext<Setting>(defaultSettings);

export const SettingDataProvider: React.FC<Props> = ({ children }) => {
  const [cookies] = useCookies(['isDemo']);

  const settings: Setting = {
    ...defaultSettings,
    TrialBlocks: cookies.isDemo ? 2 : 2,
  };

  return (
    <SettingData.Provider value={settings}>{children}</SettingData.Provider>
  );
};
