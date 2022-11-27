import {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Colors} from 'react-native-paper';

const THUMB_SIZE = 13;

const Slider = ({
  initialValue,
  maximumValue,
  width: sliderWidth,
  onChange,
  onCompleted,
  isSliding,
}) => {
  const SLIDER_WIDTH = useMemo(() => sliderWidth, [sliderWidth]);
  const animation = useSharedValue(0);

  useEffect(() => {
    if (!isSliding) {
      console.log(111);
      animation.value = (initialValue / maximumValue) * SLIDER_WIDTH;
    }
  }, [animation, initialValue, maximumValue, SLIDER_WIDTH, isSliding]);

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate(e => {
          animation.value = interpolate(
            e.x,
            [0, SLIDER_WIDTH],
            [0, SLIDER_WIDTH - THUMB_SIZE],
          );
          runOnJS(onChange)((e.x / SLIDER_WIDTH) * maximumValue);
        })
        .onEnd(e => {
          runOnJS(onCompleted)((e.x / SLIDER_WIDTH) * maximumValue);
        }),
    [SLIDER_WIDTH, animation, maximumValue, onChange, onCompleted],
  );

  const width = useAnimatedStyle(() => ({
    transform: [{translateX: animation.value - SLIDER_WIDTH + THUMB_SIZE - 2}],
  }));

  const position = useAnimatedStyle(() => ({
    transform: [{translateX: animation.value}],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={styles.container(SLIDER_WIDTH)}>
        <View style={styles.background('#ffffff59')} />
        <Animated.View style={[styles.background(Colors.red600), width]} />
        <Animated.View style={[position, styles.thumb]} />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: width => ({
    width,
    height: 4,
    alignSelf: 'center',
    justifyContent: 'center',
  }),

  background: backgroundColor => ({
    backgroundColor,
    ...StyleSheet.absoluteFill,
  }),

  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 100,
    backgroundColor: Colors.blue400,
  },
});

export default Slider;
