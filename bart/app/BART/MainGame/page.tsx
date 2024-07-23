import { AuthDisplay } from "../auth/authDisplay";
import { GameField } from "./components/GameField";
import { GameContextProvider } from "../GameData/GameContextProvider";
import { SettingDataProvider } from "../GameData/SettingDataProvider";
import { ResultsContextProvider } from "../ResultsData/ResultDataProvider";

export default function GamePage() {
  return (
    <div>
      <AuthDisplay />
      <SettingDataProvider>
        <GameContextProvider>
          <ResultsContextProvider>
            <GameField />
          </ResultsContextProvider>
        </GameContextProvider>
      </SettingDataProvider>
    </div>
  );
}
