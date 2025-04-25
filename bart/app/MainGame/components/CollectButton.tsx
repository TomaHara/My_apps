'use client';
import { useContext, useState, useEffect } from 'react';
import { GameContext } from '../../GameData/GameContextProvider';
import { ResultsContext } from '../../ResultsData/ResultDataProvider';
import { SettingData } from '../../GameData/SettingDataProvider';
import { serverTimestamp, Timestamp } from 'firebase/firestore';

export const CollectButton = () => {
  const { values, setValues } = useContext(GameContext);
  const { results, addResultsData } = useContext(ResultsContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const gainPerPush = useContext(SettingData).gainPerPush;

  const handleCollect = () => {
    if (values.pompCount === 0) {
      console.warn('Cannot collect when pomp count is 0.');
      return;
    }
    addResultsData(
      values.temporarySavings,
      false,
      values.pompCount,
      results.totalEarnings + values.temporarySavings
      // Timestamp.fromMillis(Date.now())
    );
    setValues((prevValues) => ({
      ...prevValues,
      trialCount: prevValues.trialCount + 1,
      pompCount: 0,
      temporarySavings: 0,
    }));
    console.log(results);
  };

  useEffect(() => {
    if (values.trialCount % 10 == 1 && values.trialCount != 1) {
      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000);
    }
  }),
    [values.trialCount];
  return (
    <div>
      <button
        disabled={isButtonDisabled}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        onClick={() => handleCollect()}
      >
        Collect
      </button>
    </div>
  );
};
