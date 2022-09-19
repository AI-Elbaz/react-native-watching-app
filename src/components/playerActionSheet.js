import {useState, useContext} from 'react';
import {Text, View, Pressable, StyleSheet, FlatList} from 'react-native';
import {Colors, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-actions-sheet';
import {PlayerOptionsContext} from '../contexts/playerOptionsContext';

export const PlayerOptionsSheet = () => {
  const {options, availableQualities, setPlayerOptions, playbackSpeeds} =
    useContext(PlayerOptionsContext);

  const [showSpeeds, setShowSpeeds] = useState(false);
  const [showQualities, setShowQualities] = useState(false);

  const Tile = ({icon, title, value, onPress}) => {
    return (
      <Pressable
        onPress={onPress}
        style={styles.tile}
        android_ripple={{foreground: true, borderless: false}}>
        {icon ? (
          <Icon
            name={icon}
            size={22}
            color={Colors.grey700}
            style={styles.tileIcon}
          />
        ) : (
          <View width={40} />
        )}
        <Text style={styles.tileText}>{title}</Text>
        {value && (
          <Text style={styles.tileValue}>&nbsp;&nbsp;•&nbsp;&nbsp;{value}</Text>
        )}
      </Pressable>
    );
  };

  const Default = () => {
    return (
      <>
        <Text style={styles.title}>Settings</Text>
        <Tile
          icon="settings"
          title="Quality"
          value={options.quality}
          onPress={() => setShowQualities(true)}
        />
        <Tile
          icon="fast-forward"
          title="Playback speed"
          value={
            options.playbackSpeed === 1 ? 'Normal' : `${options.playbackSpeed}x`
          }
          onPress={() => setShowSpeeds(true)}
        />
        <Tile
          icon="repeat"
          title="Loop video"
          value={options.repeat ? 'On' : 'Off'}
          onPress={() =>
            setPlayerOptions({...options, repeat: !options.repeat})
          }
        />
        <Tile
          icon="skip-forward"
          title="Autoplay"
          value={options.autoPlay ? 'On' : 'Off'}
          onPress={() =>
            setPlayerOptions({...options, autoPlay: !options.autoPlay})
          }
        />
      </>
    );
  };

  const Options = ({title, items, activeItem, onSelect, onDismiss}) => {
    return (
      <FlatList
        data={items}
        ListHeaderComponent={
          <View style={{flexDirection: 'row'}}>
            <IconButton icon="arrow-left" onPress={onDismiss} />
            <Text style={styles.title}>{title}</Text>
          </View>
        }
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Tile
            key={item}
            title={item}
            onPress={() => onSelect(item)}
            icon={item === activeItem && 'check'}
          />
        )}
      />
    );
  };

  return (
    <ActionSheet id="player-options" containerStyle={{}} gestureEnabled>
      {!showQualities && !showSpeeds && <Default />}
      {showQualities && (
        <Options
          title="Qualities"
          items={availableQualities}
          activeItem={options.quality}
          onDismiss={() => setShowQualities(false)}
          onSelect={quality => setPlayerOptions({...options, quality})}
        />
      )}
      {showSpeeds && (
        <Options
          title="Playback speed"
          items={playbackSpeeds}
          activeItem={options.playbackSpeed}
          onDismiss={() => setShowSpeeds(false)}
          onSelect={playbackSpeed =>
            setPlayerOptions({...options, playbackSpeed})
          }
        />
      )}
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginBottom: 8,
    paddingHorizontal: 16,
    color: Colors.grey800,
    fontFamily: 'YouTubeSansSemibold',
  },

  tile: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },

  tileIcon: {
    marginRight: 18,
  },

  tileText: {
    fontSize: 20,
    lineHeight: 20,
    color: Colors.grey700,
    fontFamily: 'YouTubeSansRegular',
  },

  tileValue: {
    fontSize: 16,
    color: Colors.grey600,
    fontFamily: 'YouTubeSansRegular',
  },
});
