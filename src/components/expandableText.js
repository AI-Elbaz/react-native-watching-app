import {useState, useRef, useMemo} from 'react';
import {Text, Dimensions, Pressable, StyleSheet, Animated} from 'react-native';
import {Colors} from 'react-native-paper';

const ExpandableText = ({
  children,
  numberOfLines,
  animationDuration = 200,
  style,
}) => {
  const [realLines, setRealLines] = useState(numberOfLines);
  const [currentLines, setCurrentLines] = useState(numberOfLines);
  const heightAnimation = useRef(new Animated.Value(numberOfLines)).current;

  const animation = useMemo(
    () => [
      Math.min(realLines, numberOfLines),
      Math.max(realLines, numberOfLines),
    ],
    [numberOfLines, realLines],
  );

  const textStyle = {
    fontSize: 24,
    lineHeight: 32,
    color: 'black',
    ...style,
  };

  const height = heightAnimation.interpolate({
    inputRange: animation,
    outputRange: [
      animation[0] * textStyle.lineHeight,
      animation[1] * textStyle.lineHeight,
    ],
  });

  const _onLayout = ({nativeEvent}) => {
    setRealLines(nativeEvent.lines.length);
  };

  const _toggleLines = () => {
    const lines = currentLines === numberOfLines ? realLines : numberOfLines;

    if (lines === realLines) {
      setCurrentLines(lines);
    }

    Animated.timing(heightAnimation, {
      toValue: lines,
      duration: animationDuration,
      useNativeDriver: false,
    }).start(() => setCurrentLines(lines));
  };

  return (
    <>
      <Text
        onTextLayout={_onLayout}
        style={[
          textStyle,
          {position: 'absolute', left: Dimensions.get('window').width},
        ]}>
        {children}
      </Text>

      <Pressable onPress={realLines > numberOfLines ? _toggleLines : null}>
        <Animated.Text
          style={[textStyle, {height}]}
          numberOfLines={currentLines}>
          {children}
        </Animated.Text>
        {realLines > numberOfLines && (
          <Text style={styles.toggleBtn}>
            {currentLines === numberOfLines ? 'show more' : 'show less'}
          </Text>
        )}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  toggleBtn: {
    marginVertical: 5,
    color: Colors.blueA200,
    textTransform: 'uppercase',
    fontFamily: 'YouTubeSansSemibold',
  },
});

export default ExpandableText;
