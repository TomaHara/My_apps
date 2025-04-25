import { useContext, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GameContext } from '../../../context/GameContextProvider';
import { ResultsContext } from '../../../context/ResultsDataProvider';
import { useLanguage } from '../../../context/LanguageProvider';
import { translations } from '../../../assets/translations';
import * as Haptics from 'expo-haptics';

export const CollectButton = () => {
  const { values, setValues } = useContext(GameContext);
  const { results, addResultsData } = useContext(ResultsContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { language } = useLanguage();

  // 言語に応じたテキストを取得
  const t = translations.mainGame[language];

  const handleCollect = () => {
    if (values.pompCount === 0) {
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    addResultsData(
      values.temporarySavings,
      false,
      values.pompCount,
      results.totalEarnings + values.temporarySavings
    );

    setValues((prevValues) => ({
      ...prevValues,
      trialCount: prevValues.trialCount + 1,
      pompCount: 0,
      temporarySavings: 0,
    }));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          (isButtonDisabled || values.pompCount === 0) && styles.buttonDisabled,
        ]}
        onPress={handleCollect}
        disabled={isButtonDisabled || values.pompCount === 0}
      >
        <Text style={styles.buttonText}>{t.collect}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#34C759',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
