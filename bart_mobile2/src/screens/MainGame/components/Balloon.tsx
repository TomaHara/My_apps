import React, { useContext, useCallback } from 'react';
import { Animated, StyleSheet, View, Dimensions } from 'react-native';
import { GameContext } from '../../../context/GameContextProvider';

const windowWidth = Dimensions.get('window').width;
const baseSize = Math.min(windowWidth * 0.15, 200);

// メモ化されたアニメーション関数
const createAnimatedStyle = (balloonSize: Animated.Value) => ({
  transform: [
    {
      scale: balloonSize.interpolate({
        inputRange: [baseSize, baseSize * 5],
        outputRange: [1, 5],
        extrapolate: 'clamp',
      }),
    },
  ],
});

export const Balloon = React.memo(() => {
  const { values } = useContext(GameContext);
  const pompCount = values.pompCount;
  const balloonSize = React.useRef(new Animated.Value(baseSize)).current;

  React.useEffect(() => {
    const targetSize = pompCount * 3 + baseSize;
    Animated.timing(balloonSize, {
      toValue: targetSize,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [pompCount]);

  const animatedStyle = createAnimatedStyle(balloonSize);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../../assets/Balloon.png')}
        style={[styles.image, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: baseSize,
    height: baseSize,
  },
});
