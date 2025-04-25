import React, { useContext, useLayoutEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Dimensions, Easing } from 'react-native';
import { GameContext } from '../../../context/GameContextProvider';

const windowWidth = Dimensions.get('window').width;
const baseSize = Math.min(windowWidth * 0.15, 200);

export const Balloon = () => {
  const { values } = useContext(GameContext);
  const pompCount = values.pompCount;
  const balloonSize = useRef(new Animated.Value(baseSize)).current;
  const prevSize = useRef(baseSize);

  useLayoutEffect(() => {
    const targetSize = pompCount * 3 + baseSize;

    // 現在のアニメーション値を取得
    balloonSize.stopAnimation(() => {
      Animated.timing(balloonSize, {
        toValue: targetSize,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }).start();
    });

    prevSize.current = targetSize;
  }, [pompCount]);

  const animatedStyle = {
    transform: [
      {
        scale: balloonSize.interpolate({
          inputRange: [baseSize, baseSize * 5],
          outputRange: [1, 5],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../../assets/Balloon.png')}
        style={[styles.image, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // width: baseSize,
    // height: baseSize,
    width: baseSize,
    height: baseSize,
  },
});
