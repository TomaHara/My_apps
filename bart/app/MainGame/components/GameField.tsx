"use client";
import { PompButton } from "./PompButton";
import { CollectButton } from "./CollectButton";
import { EarningsDisplay } from "./EarningsDisplay";
import { Balloon } from "./Balloon";
import { useContext, useState, useEffect } from "react";
import { SettingData } from "../../GameData/SettingDataProvider";
import { ResultsContext } from "../../ResultsData/ResultDataProvider";
import Modal from "react-modal";
import { useCookies } from "react-cookie";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  FieldValue,
  Timestamp,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

export const GameField = () => {
  const results = useContext(ResultsContext).results;
  const trialCount = results.earnings.length;
  const settings = useContext(SettingData);
  const Trials = settings.TrialBlocks * 10;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [gameStartTimestamp, setGameStartTimestamp] = useState<FieldValue>();
  const [authInfo] = useCookies(["isAuth", "username"]);
  const router = useRouter();

  useEffect(() => {
    setGameStartTimestamp(Timestamp.fromDate(new Date()));
  }, []);

  useEffect(() => {
    if (trialCount === Trials) {
      setIsOpenModal(true);
      if (authInfo.isAuth) {
        const docRef = collection(db, "Users", authInfo.username, "PlayData");
        addDoc(docRef, {
          results,
          settings,
          gameCompleteTimestamp: serverTimestamp(),
          gameStartTimestamp: gameStartTimestamp,
        });
      }
    }
  }, [trialCount, Trials, authInfo, results, settings, gameStartTimestamp]);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <div className="flex-grow flex items-center justify-center">
        <Balloon />
      </div>
      <div className="w-full mb-10 mt-5">
        <div className="flex justify-center space-x-10 mb-8 ">
          <PompButton />
          <CollectButton />
        </div>
        <div className="flex justify-center mb-4 ">
          <EarningsDisplay />
        </div>
      </div>
      <Modal className="h-full w-full" isOpen={isOpenModal}>
        <div className="h-full w-full flex justify-center items-center">
          <button
            className="px-4 py-2 flex justify-center items-center bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => router.push("/login")}
          >
            ゲーム終了
          </button>
        </div>
      </Modal>
    </div>
  );
};
