'use client';
import { PompButton } from './PompButton';
import { CollectButton } from './CollectButton';
import { EarningsDisplay } from './EarningsDisplay';
import { Balloon } from './Balloon';
import { useContext, useState, useEffect } from 'react';
import { SettingData } from '../../GameData/SettingDataProvider';
import { ResultsContext } from '../../ResultsData/ResultDataProvider';
import Modal from 'react-modal';
import { useCookies } from 'react-cookie';
import { db } from '../../firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  FieldValue,
  Timestamp,
} from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export const GameField = () => {
  const results = useContext(ResultsContext).results;
  const trialCount = results.earnings.length;
  const settings = useContext(SettingData);
  const Trials = settings.TrialBlocks * 10;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [gameStartTimestamp, setGameStartTimestamp] = useState<FieldValue>();
  const [authInfo] = useCookies(['isAuth', 'username']);
  const router = useRouter();
  useEffect(() => {
    setGameStartTimestamp(Timestamp.fromMillis(Date.now()));
  }, []);

  useEffect(() => {
    if (trialCount === Trials) {
      setTimeout(() => {
        setIsOpenModal(true);
      }, 500);
    }
  }, [trialCount, Trials]);

  const handleSubmit = async () => {
    try {
      if (authInfo.isAuth) {
        const docRef = collection(db, 'Users', authInfo.username, 'PlayData');
        await addDoc(docRef, {
          results,
          settings,
          gameCompleteTimestamp: serverTimestamp(),
          gameStartTimestamp: gameStartTimestamp,
        });
      }
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 sm:gap-16 h-hull">
      <div className="mt-2">
        <p className="text-2xl font-semibold text-black">
          {`${trialCount + 1}/${settings.TrialBlocks * 10}`}
        </p>
      </div>

      <div className="flex items-center justify-center h-[40vh] sm:h-[45vh]">
        <Balloon />
      </div>

      <div className="w-full">
        <div className="flex flex-col items-center space-y-3 mb-2">
          <div className="flex justify-center">
            <PompButton />
          </div>
          <div className="flex justify-center">
            <CollectButton />
          </div>
        </div>
        <div className="flex justify-center">
          <EarningsDisplay />
        </div>
      </div>

      <Modal className="h-full w-full" isOpen={isOpenModal}>
        <div className="h-full w-full flex flex-col justify-center items-center gap-8">
          <p className="text-lg leading-relaxed text-black mt-1">
            お疲れ様でした。ゲームが終了しました。
          </p>
          <p className="text-lg leading-relaxed text-black mt-1">
            「ゲーム終了」を押す前に、Empaticaのボタンを長押しして✔︎をつけてください。
          </p>
          <button
            className="px-4 py-2 flex justify-center items-center bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => handleSubmit()}
          >
            ゲーム終了
          </button>
        </div>
      </Modal>
    </div>
  );
};
