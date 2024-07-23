"use client";
import React, { useContext } from "react";
import { ResultsContext } from "../../ResultsData/ResultDataProvider";

export const EarningsDisplay = () => {
  const earnings = useContext(ResultsContext).results.earnings;
  const trialCount: number = earnings?.length;
  let totalEarnings: number;
  let previousbaloon: number | string;
  if (trialCount === 0) {
    totalEarnings = 0;
    previousbaloon = "なし";
  } else {
    totalEarnings = earnings.reduce((a, b) => a + b, 0);
    previousbaloon = earnings[trialCount - 1];
  }

  // const totalEarnings: number = earnings.reduce((a, b) => a + b, 0);
  // const previousbaloon: number = earnings[trialCount - 1];
  return (
    <div className="text-center">
      <div className="mb-2">
        <p className="text-lg font-bold text-black">
          合計金額: {totalEarnings}
        </p>
      </div>
      <div>
        <p className="text-lg font-bold text-black">
          前回の風船: {previousbaloon}
        </p>
      </div>
    </div>
  );
};
