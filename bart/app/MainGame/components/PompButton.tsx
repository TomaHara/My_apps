"use client";
import { useContext, useEffect, useState } from "react";
import { SettingData } from "../../GameData/SettingDataProvider";
import { GameContext } from "../../GameData/GameContextProvider";
import { ResultsContext } from "../../ResultsData/ResultDataProvider";
// import BurstImg from "./Image/Burst.png";
import Image from "next/image";

export const PompButton = () => {
  const { gainPerPush, maxBurstPoint, minBurstPoint, TrialBlocks } =
    useContext(SettingData);
  const { values, setValues } = useContext(GameContext);
  const { results, addResultsData } = useContext(ResultsContext);
  const [burstPoints, setBurstPoints] = useState<number[]>([]);

  //ランダムな整数を生成する関数
  const generateRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //ブロックの平均を調整する関数
  const adjustBlockAverage = (
    arr: number[],
    blockSize: number,
    targetAverage: number
  ): number[] => {
    const adjustedArr = [...arr];
    for (let i = 0; i < arr.length; i += blockSize) {
      let block = adjustedArr.slice(i, i + blockSize);
      let blockSum = block.reduce((sum, num) => sum + num, 0);

      //ブロックの合計が640より大きい場合の調整
      if (blockSum > targetAverage * blockSize) {
        let excess = blockSum - targetAverage * blockSize;
        let sortedBlock = [...block].sort((a, b) => b - a);

        block[block.indexOf(sortedBlock[0])] -= excess;
      }

      // ブロックの合計が640より小さい場合の調整
      if (blockSum < targetAverage * blockSize) {
        let deficit = targetAverage * blockSize - blockSum;
        let sortedBlock = [...block].sort((a, b) => a - b);

        block[block.indexOf(sortedBlock[0])] += deficit;
      }

      for (let j = 0; j < block.length; j++) {
        adjustedArr[i + j] = block[j];
      }
    }
    return adjustedArr;
  };

  //burstPointsの配列を生成する関数
  const generateBurstPoints = (
    TrialBlocks: number,
    minBurstPoint: number,
    maxBurstPoint: number
  ): number[] => {
    const burstPoints: number[] = [];
    for (let i = 0; i < TrialBlocks; i++) {
      let blockSum = 0;
      let block = [];
      while (blockSum <= 540 || blockSum >= 740) {
        block = [];
        for (let j = 0; j < 10; j++) {
          block.push(generateRandomInt(minBurstPoint, maxBurstPoint));
        }
        blockSum = block.reduce((sum, num) => sum + num, 0);
      }
      burstPoints.push(...block);
    }
    const adjustedBurstPoints = adjustBlockAverage(
      burstPoints,
      10,
      maxBurstPoint / 2
    );
    for (let i = 0; i < adjustedBurstPoints.length; i += 10) {
      let block = adjustedBurstPoints.slice(i, i + 10);
      let blockSum = block.reduce((sum, num) => sum + num, 0);
      // console.log(`Block ${i / 10 + 1} Sum: ${blockSum}`);
      // console.log(block);
      // console.log(adjustedBurstPoints);
    }
    console.log(adjustedBurstPoints);
    return adjustedBurstPoints;
  };

  //burstPointsの配列を生成
  useEffect(() => {
    setBurstPoints(
      generateBurstPoints(TrialBlocks, minBurstPoint, maxBurstPoint)
    );
  }, []);

  // //爆発したときにフルスクリーンダイアログを表示する関数
  // const showFullScreenDialog = () => {
  //   const dialog = document.querySelector("#dialog") as HTMLDialogElement;
  //   dialog.showModal();
  // };

  //ダイアログを表示する関数
  const openDialog = () => {
    const dialog = document.querySelector("dialog") as HTMLDialogElement;
    dialog.showModal();
  };

  //ダイアログを閉じる関数
  const closeDialog = () => {
    const dialog = document.querySelector("dialog") as HTMLDialogElement;
    dialog.close();
  };

  //空気を入れるボタンを押したときの処理
  const handlePomp = () => {
    setValues((prevValues) => ({
      ...prevValues,
      pompCount: prevValues.pompCount + 1,
      temporarySavings: prevValues.temporarySavings + gainPerPush,
    }));
    console.log(values);
    if (values.pompCount + 1 == burstPoints[values.trialCount - 1]) {
      openDialog();
      addResultsData(0, true, values.pompCount + 1);
      setValues((prevValues) => ({
        ...prevValues,
        trialCount: prevValues.trialCount + 1,
        pompCount: 0,
        temporarySavings: gainPerPush,
      }));
      // showFullScreenDialog();
      console.log(results);
      console.log(burstPoints);
    }
  };

  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => handlePomp()}
        // onKeyDown={(e) => handlePomp(e)}
      >
        空気を入れる
      </button>
      <dialog className="w-screen h-screen">
        <div className=" h-full flex justify-center items-center">
          <div className="flex-col">
            <Image src="/Burst.png" alt="burst" width={500} height={500} />
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                autoFocus
                onClick={() => closeDialog()}
              >
                次の風船
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};
