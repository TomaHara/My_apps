'use client';
import React, { useContext } from 'react';
import { ResultsContext } from '../../ResultsData/ResultDataProvider';

export const EarningsDisplay = () => {
  const earnings = useContext(ResultsContext).results.earnings;
  const trialCount: number = earnings?.length;
  const totalEarnings: number =
    useContext(ResultsContext).results.totalEarnings;
  // let totalEarnings: number;
  let previousbaloon: number | string;
  if (trialCount === 0) {
    // totalEarnings = 0;
    previousbaloon = '';
  } else {
    // totalEarnings = earnings.reduce((a, b) => a + b, 0);
    previousbaloon = earnings[trialCount - 1];
  }

  // const totalEarnings: number = earnings.reduce((a, b) => a + b, 0);
  // const previousbaloon: number = earnings[trialCount - 1];
  return (
    <div className="text-center">
      <div className="mb-2">
        <p className="text-lg font-bold text-black">
          Total Eearned: {totalEarnings}
        </p>
      </div>
      <div>
        <p className="text-lg font-bold text-black">
          Last Balloon: {previousbaloon}
        </p>
      </div>
    </div>
  );
};
