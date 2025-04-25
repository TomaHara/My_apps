'use client';
import { useContext, useEffect, useState, useRef } from 'react';
import { SettingData } from '../../GameData/SettingDataProvider';
import { GameContext } from '../../GameData/GameContextProvider';
import { ResultsContext } from '../../ResultsData/ResultDataProvider';
import { serverTimestamp, Timestamp } from 'firebase/firestore';

export const PompButton = () => {
  const { gainPerPush, maxBurstPoint, minBurstPoint, TrialBlocks } =
    useContext(SettingData);
  const { values, setValues } = useContext(GameContext);
  const {
    results,
    addResultsData,
    addTotalEarnings,
    // addIsChallenged,
    // addIsSucceeded,
  } = useContext(ResultsContext);
  const [burstPoints, setBurstPoints] = useState<number[]>([]);
  const [doubleChance, setDoubleChance] = useState<number[]>([]);
  const [pompButtonDisabled, setPompButtonDisabled] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const totalEarnings = results.totalEarnings;

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

  // //ダブルチャンスの配列を生成する関数
  // const generateDoubleChance = (TrialBlocks: number): number[] => {
  //   let doubleChance: number[] = [];
  //   do {
  //     doubleChance = [];
  //     for (let i = 0; i < TrialBlocks; i++) {
  //       doubleChance.push(generateRandomInt(0, 1));
  //     }
  //   } while (
  //     doubleChance.filter((num) => num === 0).length !==
  //     doubleChance.filter((num) => num === 1).length
  //   );
  //   console.log(doubleChance);
  //   return doubleChance;
  // };

  // //ダブルチャンスの配列を生成
  // useEffect(() => {
  //   setDoubleChance(generateDoubleChance(TrialBlocks));
  // }, []);

  // //爆発したときにフルスクリーンダイアログを表示する関数
  // const showFullScreenDialog = () => {
  //   const dialog = document.querySelector("#dialog") as HTMLDialogElement;
  //   dialog.showModal();
  // };

  //ダイアログを表示する関数
  const openDialog = () => {
    const burstDialog = document.getElementById('burst') as HTMLDialogElement;
    burstDialog.showModal();
  };

  //ダイアログを閉じる関数
  const closeDialog = () => {
    const burstDialog = document.getElementById('burst') as HTMLDialogElement;
    burstDialog.close();
    setPompButtonDisabled(false);
    setButtonDisabled(false);
  };

  const handlePomp = (increment: number) => {
    setValues((prevValues) => ({
      ...prevValues,
      pompCount: prevValues.pompCount + increment,
      temporarySavings: prevValues.temporarySavings + gainPerPush * increment,
    }));

    if (increment > 1) {
      // const delay = increment === 5 ? 500 : 1000; // Delay for +5 and +10
      // setTimeout(() => {
      if (values.pompCount + increment >= burstPoints[values.trialCount - 1]) {
        openDialog();
        addResultsData(
          0,
          true,
          values.pompCount + increment,
          totalEarnings + 0
          // Timestamp.fromMillis(Date.now())
        );
        setValues((prevValues) => ({
          ...prevValues,
          trialCount: prevValues.trialCount + 1,
          pompCount: 0,
          temporarySavings: 0,
        }));
      }
      // }, delay);
    } else {
      if (values.pompCount + increment >= burstPoints[values.trialCount - 1]) {
        openDialog();
        addResultsData(
          0,
          true,
          values.pompCount + increment,
          totalEarnings + 0
          // Timestamp.fromMillis(Date.now())
        );
        setValues((prevValues) => ({
          ...prevValues,
          trialCount: prevValues.trialCount + 1,
          pompCount: 0,
          temporarySavings: gainPerPush,
        }));
      }
    }
  };

  const [isSuccess, setIsSuccess] = useState<string | null>(null);

  // //10の倍数でダブルチャンスのダイアログを表示
  // useEffect(() => {
  //   const dialog = document.getElementById('doubleChance') as HTMLDialogElement;
  //   const burstDialog = document.getElementById('burst') as HTMLDialogElement;
  //   if (values.trialCount % 10 == 1 && values.trialCount != 1) {
  //     setPompButtonDisabled(true);
  //     setButtonDisabled(false);
  //     setIsSuccess(null);
  //     setTimeout(() => {
  //       dialog.showModal();
  //       burstDialog.close();
  //     }, 200);
  //   }
  // }, [values.trialCount]);

  // //挑戦をクリックしたときの処理
  // const handleChallenge = () => {
  //   setButtonDisabled(true);
  //   setPompButtonDisabled(false);
  //   const doubledialog = document.getElementById(
  //     'doubleChance'
  //   ) as HTMLDialogElement;
  //   if (doubleChance[Math.floor(values.trialCount / 10) - 1] == 1) {
  //     addTotalEarnings(totalEarnings * 2);
  //     addIsSucceeded(true);
  //     setIsSuccess('成功');
  //   } else {
  //     addTotalEarnings(Math.ceil(totalEarnings / 2 / 5) * 5);
  //     addIsSucceeded(false);
  //     setIsSuccess('失敗');
  //   }
  //   addIsChallenged(true);
  //   console.log(doubleChance[Math.floor(values.trialCount / 10) - 1]);
  //   console.log(doubleChance);
  //   setTimeout(() => {
  //     doubledialog.close();
  //     setButtonDisabled(false);
  //   }, 1000);
  // };

  return (
    <div>
      <div className="flex justify-center space-x-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => handlePomp(1)}
        >
          Pump +1
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          onClick={() => handlePomp(3)}
        >
          Pump +3
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          onClick={() => handlePomp(5)}
        >
          Pump +5
        </button>
      </div>

      <dialog id="burst" className="absolute top-0 left-0 w-screen h-screen">
        <div className=" h-full flex justify-center items-center">
          <div className="flex-col">
            <img src="/Burst.png" alt="Pomp Button" width="600" height="600" />
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                autoFocus
                onClick={() => closeDialog()}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </dialog>
      {/* <dialog id="doubleChance" className="absolute top-0 left-0 w-hull h-hull">
        <div className="w-screen h-screen flex flex-col gap-8 justify-center items-center">
          <h1 className="text-3xl font-semibold">ダブルチャンス</h1>
          <p>
            「挑戦」を押すと一定確率で総得点は
            <span className="font-semibold">2倍</span>か
            <span className="font-semibold">1/2倍</span>になります。
          </p>
          <p>{`現在の総得点: ${totalEarnings}`}</p>
          <p className="text-3xl mt-4">{isSuccess}</p>
          <div className="flex gap-8 mt-8">
            <button
              disabled={buttonDisabled}
              className="py-1 px-2 rounded-lg text-2xl text-white bg-blue-500"
              type="button"
              onClick={() => {
                handleChallenge();
              }}
            >
              挑戦
            </button>
            <button
              disabled={buttonDisabled}
              className="py-1 px-2 rounded-lg text-2xl text-white bg-red-500"
              type="button"
              onClick={() => {
                const dialog = document.getElementById(
                  'doubleChance'
                ) as HTMLDialogElement;
                dialog.close();
                addIsChallenged(false);
                addIsSucceeded(null);
              }}
            >
              辞退
            </button>
          </div>
        </div>
      </dialog> */}
    </div>
  );
};
