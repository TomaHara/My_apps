module.exports = {
  expo: {
    name: 'bart-mobile',
    slug: 'bart-mobile',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    owner: 'barttask',
    splash: {
      image: './assets/icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.toma.bartmobile2',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.toma.bartmobile2',
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
        projectId: 'c5850b7a-c481-4c53-b076-168c4eeb8465',
      },
    },
    plugins: [
      'expo-router',
      '@react-native-firebase/app',
      '@react-native-firebase/auth',
    ],
    updates: {
      url: 'https://u.expo.dev/c5850b7a-c481-4c53-b076-168c4eeb8465',
    },
    runtimeVersion: '1.0.0',
  },
};
