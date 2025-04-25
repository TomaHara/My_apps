import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameContext } from '../../../context/GameContextProvider';
import { ResultsContext } from '../../../context/ResultsDataProvider';

export const EarningsDisplay = () => {
  const { values } = useContext(GameContext);
  const { results } = useContext(ResultsContext);
  const earnings = results.earnings;
  const trialCount = earnings.length;
  const totalEarnings = results.totalEarnings;
  const previousBalloon = trialCount === 0 ? '0' : earnings[trialCount - 1];
  const temporarySavings = values.temporarySavings;

  return (
    <View style={styles.container}>
      {/* <View style={styles.box}>
        <Text style={styles.label}>現在の貯金:</Text>
        <Text style={styles.amount}>{temporarySavings}</Text>
      </View> */}
      <View style={styles.box}>
        <Text style={styles.label}>総得点:</Text>
        <Text style={styles.amount}>{totalEarnings}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.label}>前回の得点:</Text>
        <Text style={styles.amount}>{previousBalloon}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
