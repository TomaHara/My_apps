import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';

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
  TrialBlocks: 3,
  gainPerPush: 5,
  maxBurstPoint: 128,
  minBurstPoint: 1,
};

export const SettingData = createContext<Setting>(defaultSettings);

export const SettingDataProvider: React.FC<Props> = ({ children }) => {
  const [settings, setSettings] = useState<Setting>(defaultSettings);
  // const { isDemo } = useAuth();

  // useEffect(() => {
  //   if (isDemo) {
  //     setSettings({
  //       ...defaultSettings,
  //       TrialBlocks: 2,
  //     });
  //   } else {
  //     setSettings(defaultSettings);
  //   }
  // }, [isDemo]);

  return (
    <SettingData.Provider value={settings}>{children}</SettingData.Provider>
  );
};
