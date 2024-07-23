"use client";
import React, { useContext } from "react";
import { GameContext } from "../../GameData/GameContextProvider";
import Image from "next/image";
// import BalloonImg from "./Image/Balloon.png";
// import BalloonImg from "./Image/Balloon.svg";

export const Balloon = () => {
  const pompCount = useContext(GameContext).values.pompCount;
  const balloonSize = pompCount * 4 + 30; // Adjust the multiplier as needed
  // const balloonSize = 128 * 5 + 50;

  return (
    <div className="flex justify-center items-center">
      <Image
        src="/Balloon.png"
        width={balloonSize}
        height={balloonSize}
        layout="fixed"
        objectFit="contain"
        alt="Balloon"
      />
    </div>
  );
};
