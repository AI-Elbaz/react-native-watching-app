import {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import {ActivityIndicator, Colors} from 'react-native-paper';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import {SheetManager} from 'react-native-actions-sheet';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Feather';
import Orientation from 'react-native-orientation-locker';
import {HistoryContext} from '../contexts/historyContext';
import {PlayerOptionsContext} from '../contexts/playerOptionsContext';

const Player = ({episode, handleIncomingVideo}) => {
  const videoRef = useRef(null);
  const doubleTapRef = useRef();
  const Dimensions = useWindowDimensions();
  const [sources, setSources] = useState([]);
  const [currentSource, setCurrentSource] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [paused, setPaused] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);
  const [isSliding, setIsSliding] = useState(null);
  const [negativeTime, setNegativeTime] = useState(false);
  const componentWillUnmount = useRef(false);
  const {addToHistory} = useContext(HistoryContext);
  const {options, setAvailableQualities, availableQualities, setSource} =
    useContext(PlayerOptionsContext);

  const _getData = async ep => {
    const response = await fetch(
      'https://www.luxubu.review/api/source/' + ep.identifier,
      {method: 'POST'},
    );
    return (await response.json()).data;
  };

  useEffect(() => {
    componentWillUnmount.current = false;
    _getData(episode).then(setSources);
  }, [episode]);

  useEffect(() => {
    Orientation.addDeviceOrientationListener(orientation =>
      setFullscreen(orientation.startsWith('LANDSCAPE')),
    );

    return () => {
      Orientation.unlockAllOrientations();
      Orientation.removeAllListeners();
      componentWillUnmount.current = true;
    };
  }, []);

  const _handleAddToHistory = useCallback(() => {
    if (!videoLoading && currentTime >= duration * 0.01) {
      const percentage = currentTime / duration;
      episode.watchPercentage = percentage >= 0.95 ? 1 : percentage;
      addToHistory(episode);
    }
  }, [videoLoading, currentTime, episode, addToHistory, duration]);

  useEffect(
    () => () => {
      if (componentWillUnmount.current) {
        _handleAddToHistory();
      }
    },
    [videoLoading, currentTime, _handleAddToHistory],
  );

  useEffect(() => {
    if (fullscreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }

    StatusBar.setHidden(fullscreen);
  }, [fullscreen]);

  useEffect(() => {
    if (sources.length > 0) {
      const availables = sources.map(source => source.label);
      setAvailableQualities(availables);

      const qualityIndex = availables.indexOf(options.quality);
      const final = qualityIndex > -1 ? qualityIndex : qualityIndex - 1;

      setSource(sources[final]);
      setCurrentSource(sources[final]);
    }
  }, [sources, options.quality, setAvailableQualities, setSource]);

  useEffect(() => {
    setVideoLoading(true);
    setPaused(true);

    setCurrentSource(sources[availableQualities.indexOf(options.quality)]);
  }, [options.quality, sources, availableQualities]);

  const divmod = number => {
    return [
      Math.floor(number / 60),
      Math.floor(number % 60)
        .toString()
        .padStart(2, '0'),
    ];
  };

  const _onProgress = data => {
    if (!isSliding) {
      setCurrentTime(data.currentTime);
    }
  };

  const _handleSingleTap = ({nativeEvent}) => {
    if (nativeEvent.state === State.ACTIVE) {
      setShowControls(prev => !prev);
    }
  };

  const _handleDoubleTap = ({nativeEvent}) => {
    if (nativeEvent.state === State.ACTIVE) {
      const forward = nativeEvent.x > Dimensions.width / 2;
      setCurrentTime(prev => {
        let newTime = prev + (forward ? 5 : -5);

        if (newTime < 0) {
          newTime = 0;
        }
        if (newTime > duration) {
          newTime = duration;
        }

        videoRef.current.seek(newTime);
        return newTime;
      });
    }
  };

  const _handleVideoLoaded = data => {
    setDuration(data.duration);
    if (episode.watchPercentage && !currentTime) {
      const percentage = episode.watchPercentage;
      const time = percentage === 1 ? 0 : percentage * data.duration;
      videoRef.current.seek(time);
      setCurrentTime(time);
    }
    if (currentTime) {
      videoRef.current.seek(currentTime);
    }
    setVideoLoading(false);
  };

  const _handleSliderComplete = value => {
    videoRef.current.seek(value);
    setIsSliding(false);
  };

  const _handleIncomingVideo = mode => {
    _handleAddToHistory();
    setVideoLoading(true);
    setCurrentTime(0);
    handleIncomingVideo(mode);
  };

  const _handleVideoEnd = () => {
    if (options.autoPlay) {
      _handleIncomingVideo('next');
    }
    if (!options.repeat && !options.autoPlay) {
      setPaused(true);
    }
  };

  return (
    <>
      {!fullscreen && (
        <View
          style={{
            height: StatusBar.currentHeight,
            backgroundColor: 'black',
          }}
        />
      )}
      <View
        style={[
          styles.container,
          {height: (Dimensions.width * 9) / 16},
          fullscreen
            ? {
                marginTop: 0,
                width: Dimensions.width,
                height: Dimensions.height,
              }
            : null,
        ]}>
        <Video
          ref={videoRef}
          paused={paused}
          rate={options.playbackSpeed}
          repeat={options.repeat}
          onError={err => console.log('error', err)}
          onProgress={_onProgress}
          onLoad={_handleVideoLoaded}
          onEnd={_handleVideoEnd}
          style={StyleSheet.absoluteFill}
          source={{uri: currentSource && currentSource.file}}
        />
        <TapGestureHandler
          onHandlerStateChange={_handleSingleTap}
          waitFor={doubleTapRef}>
          <TapGestureHandler
            ref={doubleTapRef}
            numberOfTaps={2}
            onHandlerStateChange={_handleDoubleTap}>
            <View
              style={{
                ...StyleSheet.absoluteFill,
                backgroundColor: showControls ? '#00000073' : 'transparent',
              }}
            />
          </TapGestureHandler>
        </TapGestureHandler>
        {videoLoading && (
          <ActivityIndicator
            size={48}
            color="white"
            animating={true}
            style={[StyleSheet.absoluteFill, styles.center]}
          />
        )}
        {showControls && !videoLoading && (
          <View style={[StyleSheet.absoluteFill, styles.center]}>
            <View
              style={{
                ...StyleSheet.absoluteFill,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable
                disabled={episode.id === 1}
                onPress={() => _handleIncomingVideo('previous')}
                style={{
                  backgroundColor: '#00000066',
                  padding: 12,
                  borderRadius: 50,
                  opacity: episode.id === 1 ? 0.5 : null,
                  overflow: 'hidden',
                }}
                android_ripple={{foreground: true, borderless: false}}>
                <Icon name="skip-back" size={20} color="white" />
              </Pressable>

              <Pressable
                onPress={() => setPaused(prev => !prev)}
                style={{
                  backgroundColor: '#00000066',
                  padding: 12,
                  marginHorizontal: 35,
                  borderRadius: 50,
                  overflow: 'hidden',
                }}
                android_ripple={{foreground: true, borderless: false}}>
                <Icon
                  name={paused ? 'play' : 'pause'}
                  size={32}
                  color="white"
                />
              </Pressable>

              <Pressable
                onPress={() => _handleIncomingVideo('next')}
                style={{
                  backgroundColor: '#00000066',
                  padding: 12,
                  borderRadius: 50,
                  overflow: 'hidden',
                }}
                android_ripple={{foreground: true, borderless: false}}>
                <Icon name="skip-forward" size={20} color="white" />
              </Pressable>
            </View>
            <View style={styles.bar}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: fullscreen ? 24 : 12,
                  paddingBottom: 5,
                }}>
                <Pressable
                  onPress={() => setNegativeTime(prev => !prev)}
                  style={{marginRight: 'auto'}}>
                  <Text style={{color: 'white'}}>
                    {currentTime === 0
                      ? '0:00'
                      : negativeTime
                      ? '-' + divmod(duration - currentTime).join(':')
                      : divmod(currentTime).join(':')}{' '}
                    /&nbsp;
                    {duration === 0 ? '0:00' : divmod(duration).join(':')}
                  </Text>
                </Pressable>
                {sources && (
                  <Pressable
                    onPress={() => SheetManager.show('player-options')}
                    style={{marginRight: 16}}
                    android_ripple={{
                      foreground: true,
                      borderless: true,
                      color: 'white',
                    }}>
                    <Icon name="settings" size={20} color="white" />
                  </Pressable>
                )}
                <Pressable
                  onPress={() => setFullscreen(prev => !prev)}
                  android_ripple={{
                    foreground: true,
                    borderless: true,
                    color: 'white',
                  }}>
                  <Icon
                    name={fullscreen ? 'minimize' : 'maximize'}
                    size={20}
                    color="white"
                  />
                </Pressable>
              </View>
              <Slider
                value={currentTime}
                minimumValue={0}
                maximumValue={duration}
                onSlidingStart={() => setIsSliding(true)}
                onValueChange={v => setCurrentTime(v)}
                onSlidingComplete={_handleSliderComplete}
                style={{width: '100%'}}
                thumbTintColor={Colors.red600}
                minimumTrackTintColor={Colors.red600}
                maximumTrackTintColor="white"
              />
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: 'black',
  },

  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeQuality: {
    backgroundColor: Colors.grey200,
  },

  bar: {
    bottom: 0,
    width: '100%',
    paddingBottom: 10,
    position: 'absolute',
  },
});

export default Player;
