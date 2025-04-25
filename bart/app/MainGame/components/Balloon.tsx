'use client';
import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../GameData/GameContextProvider';

export const Balloon = () => {
  const pompCount = useContext(GameContext).values.pompCount;
  const [balloonSize, setBalloonSize] = useState(pompCount * 3 + 20);

  useEffect(() => {
    const targetSize = pompCount * 3 + 30; // Adjusted size calculation
    const animationDuration = pompCount > 1 ? 0 : 0;

    // const animation = setTimeout(() => {
    setBalloonSize(targetSize);
    // }, animationDuration);

    // return () => clearTimeout(animation);
  }, [pompCount]);

  return (
    <div className="flex justify-center items-center">
      <img
        src="/Balloon.png"
        width={balloonSize}
        height={balloonSize}
        style={{ objectFit: 'contain', transition: 'width 0.5s, height 0.5s' }}
        alt="Balloon"
      />
    </div>
  );
};
