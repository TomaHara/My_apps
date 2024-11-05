'use client';
import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

interface Setting {
  TrialBlocks: number;
  gainPerPush: number;
  maxBurstPoint: number;
  minBurstPoint: number;
}

const settingInfo: Setting = {
  TrialBlocks: 2,
  gainPerPush: 5,
  maxBurstPoint: 128,
  minBurstPoint: 1,
};

export const SettingData = createContext<Setting>(settingInfo);

export const SettingDataProvider: React.FC<Props> = ({ children }) => {
  return (
    <SettingData.Provider value={settingInfo}>{children}</SettingData.Provider>
  );
};
