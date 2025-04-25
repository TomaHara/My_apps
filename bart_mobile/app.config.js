export default {
  name: 'BART Mobile',
  slug: 'bart-mobile',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  owner: 'barttask',
  splash: {
    image: './assets/images/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.yourdomain.bartmobile',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.yourdomain.bartmobile',
    scheme: 'bartmobile',
    newArchEnabled: true,
  },
  web: {
    // favicon: './src/assets/favicon.png',
    favicon: './assets/images/favicon.png',
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
      projectId: '34aab0c8-3361-4e00-ba05-da19257495b7',
    },
  },
  updates: {
    url: 'https://u.expo.dev/34aab0c8-3361-4e00-ba05-da19257495b7',
  },
  runtimeVersion: {
    policy: 'sdkVersion',
  },
};
