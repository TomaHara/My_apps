import LoginScreen from '../../src/screens/Login/LoginScreen';
import { useRouter } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function Page() {
  const router = useRouter();
  return (
    <LoginScreen
      navigation={
        {
          navigate: (name: keyof RootStackParamList) => router.push(name),
        } as LoginScreenNavigationProp
      }
    />
  );
}
