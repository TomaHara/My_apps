import { AuthDisplay } from '../auth/authDisplay';
import { GameField } from './components/GameField';
import { GameContextProvider } from '../GameData/GameContextProvider';
import { SettingDataProvider } from '../GameData/SettingDataProvider';
import { ResultsContextProvider } from '../ResultsData/ResultDataProvider';

export default function GamePage() {
  return (
    <div className="relative h-screen bg-gray-100">
      <div className="absolute inset-0 md:mx-20 lg:mt-10">
        <AuthDisplay />
      </div>
      <div className="absolute inset-14 lg:mx-44">
        <SettingDataProvider>
          <GameContextProvider>
            <ResultsContextProvider>
              <GameField />
            </ResultsContextProvider>
          </GameContextProvider>
        </SettingDataProvider>
      </div>
    </div>
  );
}
