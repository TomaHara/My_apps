import { Redirect } from 'expo-router';
import { useAuth } from '../src/context/AuthProvider';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    console.log('Auth state:', { user: user?.email, isLoading });
  }, [user, isLoading]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user) {
    console.log('Redirecting to sleepQuestionnaire');
    return <Redirect href="/sleepQuestionnaire" />;
  }

  console.log('Redirecting to login');
  return <Redirect href="/login" />;
}
