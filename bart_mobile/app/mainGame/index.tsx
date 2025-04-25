import MainGameScreen from '../../src/screens/MainGame/MainGameScreen';
import { useRouter } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type MainGameScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainGame'
>;

export default function Page() {
  const router = useRouter();
  return (
    <MainGameScreen
      navigation={
        {
          navigate: (name: keyof RootStackParamList) => router.push(name),
        } as MainGameScreenNavigationProp
      }
    />
  );
}
