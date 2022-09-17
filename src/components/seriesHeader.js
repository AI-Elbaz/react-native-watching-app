import {StyleSheet, Image, Pressable, Animated, StatusBar} from 'react-native';
import {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Colors, IconButton, useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import {HistoryContext} from '../contexts/historyContext';
import {SeriesContext} from '../contexts/seriesContext';

const MAX_HEIGHT = 400;
const MIN_HEIGHT = 85;
const DISTANCE = MAX_HEIGHT - MIN_HEIGHT;

const SeriesHeader = ({series, animation}) => {
  const {colors} = useTheme();
  const {history} = useContext(HistoryContext);
  const navigation = useNavigation();
  const episodes = useContext(SeriesContext).episodes.filter(
    ep => ep.seriesId === series.id,
  );
  const lastEpisode = history.filter(
    ep => ep.seriesId === series.id && ep.watchPercentage !== 1,
  );

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);

  const height = animation.interpolate({
    inputRange: [0, DISTANCE],
    outputRange: [MAX_HEIGHT, MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, DISTANCE],
    outputRange: [40, 0],
    extrapolate: 'clamp',
  });

  const fontSize1 = animation.interpolate({
    inputRange: [0, DISTANCE],
    outputRange: [36, 24],
    extrapolate: 'clamp',
  });

  const fontSize2 = animation.interpolate({
    inputRange: [0, DISTANCE],
    outputRange: [20, 16],
    extrapolate: 'clamp',
  });

  const padding = animation.interpolate({
    inputRange: [0, DISTANCE],
    outputRange: [60, 0],
    extrapolate: 'clamp',
  });

  const marginTop = animation.interpolate({
    inputRange: [0, DISTANCE],
    outputRange: ['70%', '0%'],
    extrapolate: 'clamp',
  });

  const containerPadding = animation.interpolate({
    inputRange: [0, DISTANCE],
    outputRange: [10, 0],
    extrapolate: 'clamp',
  });

  const StatusBarPadding = animation.interpolate({
    inputRange: [0, DISTANCE],
    outputRange: [StatusBar.currentHeight, 0],
    extrapolate: 'clamp',
  });

  const opacity = animation.interpolate({
    inputRange: [0, DISTANCE],
    outputRange: [0, 0.8],
    extrapolate: 'clamp',
  });

  const marginRight = animation.interpolate({
    inputRange: [0, DISTANCE],
    outputRange: [40, 20],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={{padding: containerPadding, paddingTop: StatusBarPadding}}>
      <Animated.View
        style={styles.header({
          height,
          borderRadius,
        })}>
        <Image source={series.poster} style={styles.image} resizeMode="cover" />
        <AnimatedLinearGradient
          colors={['transparent', 'black']}
          style={[StyleSheet.absoluteFill, styles.gradient(padding)]}>
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {backgroundColor: 'black', opacity},
            ]}
          />
          <IconButton
            size={28}
            icon="arrow-left"
            style={{position: 'absolute', top: 20, left: 10}}
            onPress={() => navigation.goBack()}
            color={Colors.grey300}
          />
          <Animated.Text style={styles.seriesTitle(fontSize1, marginTop)}>
            {series.title}
          </Animated.Text>
          <Animated.Text style={styles.episodesNumber(fontSize2)}>
            {series.episodes} Episode
          </Animated.Text>
        </AnimatedLinearGradient>
      </Animated.View>
      <AnimatedPressable
        android_ripple={{foreground: true, borderless: false}}
        onPress={() =>
          navigation.navigate('Watch', {
            episode: lastEpisode.length > 0 ? lastEpisode[0] : episodes[0],
          })
        }
        style={styles.playBtn(marginRight)}>
        <Icon name="play" size={36} color={colors.placeholder} />
      </AnimatedPressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: animation => ({
    elevation: 10,
    overflow: 'hidden',
    ...animation,
  }),

  image: {
    width: '100%',
    height: '100%',
  },

  gradient: padding => ({
    paddingBottom: padding,
    paddingHorizontal: 10,
    justifyContent: 'center',
  }),

  seriesTitle: (fontSize, marginTop) => ({
    fontSize,
    marginTop,
    color: 'white',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'YouTubeSansBold',
  }),

  episodesNumber: fontSize => ({
    fontSize,
    textAlign: 'center',
    color: Colors.grey400,
    marginTop: -5,
    fontFamily: 'YouTubeSansRegular',
  }),

  playBtn: marginRight => ({
    marginRight,
    padding: 15,
    borderRadius: 100,
    flexDirection: 'row',
    overflow: 'hidden',
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    marginTop: -40,
    elevation: 5,
  }),
});

export default SeriesHeader;
