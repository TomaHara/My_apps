"use client";
import React, { useContext } from "react";
import { GameContext } from "../../GameData/GameContextProvider";

export const Balloon = () => {
  const pompCount = useContext(GameContext).values.pompCount;
  const balloonSize = pompCount * 4 + 30; // Adjust the multiplier as needed
  // const balloonSize = 128 * 5 + 50;

  return (
    <div className="flex justify-center items-center">
      <img
        src="/Balloon.png"
        width={balloonSize}
        height={balloonSize}
        style={{ objectFit: "contain" }}
        alt="Balloon"
      />
    </div>
  );
};
