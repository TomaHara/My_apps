import { GameField } from "../BART/MainGame/components/GameField";
import { SettingDataProvider } from "../BART/GameData/SettingDataProvider";

export default function PlayingPage() {
  return (
    <SettingDataProvider>
      <GameField />
    </SettingDataProvider>
  );
}
