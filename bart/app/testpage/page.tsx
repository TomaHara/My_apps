"use client";
import { useEffect } from "react";

const generateRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const adjustBlockAverage = (
  arr: number[],
  blockSize: number,
  targetAverage: number
): number[] => {
  const adjustedArr = [...arr];
  for (let i = 0; i < arr.length; i += blockSize) {
    let block = adjustedArr.slice(i, i + blockSize);
    let blockSum = block.reduce((sum, num) => sum + num, 0);

    // Additional adjustment if sum is greater than 640
    if (blockSum > targetAverage * blockSize) {
      let excess = blockSum - targetAverage * blockSize;
      let sortedBlock = [...block].sort((a, b) => b - a);

      block[block.indexOf(sortedBlock[0])] -= excess;
    }

    // Additional adjustment if sum is less than 640
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

export default function BalloonAnalogueRiskTask() {
  const Trials = 9;
  const maxBurstPoint = 128;
  const minBurstPoint = 1;

  const burstPoints: number[] = [];
  for (let i = 0; i < Trials; i++) {
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
  const adjustedBurstPoints = adjustBlockAverage(burstPoints, 10, 64);
  for (let i = 0; i < adjustedBurstPoints.length; i += 10) {
    let block = adjustedBurstPoints.slice(i, i + 10);
    let blockSum = block.reduce((sum, num) => sum + num, 0);
    console.log(`Block ${i / 10 + 1} Sum: ${blockSum}`);
    console.log(block);
  }

  const targetAverage = 640;
  const adjustedBurstPointsFinal = adjustBlockAverage(
    adjustedBurstPoints,
    10,
    targetAverage / 10
  );

  return <div>テストです。</div>;
}
