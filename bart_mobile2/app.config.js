module.exports = {
  expo: {
    name: 'bart',
    slug: 'bart-test',
    version: '1.0.0',
    scheme: 'bart',
    icon: './assets/images/icon.png',
    owner: 'barttask',
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.barttask.bart',
    },
    android: {
      package: 'com.barttask.bart',
    },
    extra: {
      firebaseApiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId:
        process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      eas: {
        projectId: '65fb8633-462a-4899-9ae4-06892a8823fe',
      },
    },
    plugins: ['expo-router'],
    updates: {
      url: 'https://u.expo.dev/65fb8633-462a-4899-9ae4-06892a8823fe',
    },
    runtimeVersion: '1.0.0',
  },
};
