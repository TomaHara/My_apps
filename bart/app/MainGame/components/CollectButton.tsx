"use client";
import { use, useContext } from "react";
import { GameContext } from "../../GameData/GameContextProvider";
import { ResultsContext } from "../../ResultsData/ResultDataProvider";
import { SettingData } from "../../GameData/SettingDataProvider";

export const CollectButton = () => {
  const { values, setValues } = useContext(GameContext);
  const { results, addResultsData } = useContext(ResultsContext);
  const gainPerPush = useContext(SettingData).gainPerPush;

  const handleCollect = () => {
    addResultsData(values.temporarySavings, false, values.pompCount);
    setValues((prevValues) => ({
      ...prevValues,
      trialCount: prevValues.trialCount + 1,
      pompCount: 0,
      temporarySavings: gainPerPush,
    }));
    console.log(results);
  };
  return (
    <div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        onClick={() => handleCollect()}
      >
        回収する
      </button>
    </div>
  );
};
