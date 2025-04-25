import InstructionScreen from '../../src/screens/Instruction/InstructionScreen';
import { useRouter } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type InstructionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Instruction'
>;

export default function Page() {
  const router = useRouter();
  return (
    <InstructionScreen
      navigation={
        {
          navigate: (name: keyof RootStackParamList) => router.push(name),
        } as InstructionScreenNavigationProp
      }
    />
  );
}
