import { useMemo, useContext, useState, useCallback } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useBottomSheet, BottomSheetModal, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import Icon from "react-native-vector-icons/Feather";
import { useTheme } from "@react-navigation/native";
import { Colors } from "react-native-paper";
import { PlayerOptionsContext } from "../contexts/playerOptionsContext";

const PlayerOptionTile = ({ title, icon, onPress, value }) => {
  const { colors } = useTheme();

  return (
    <Pressable style={styles.tile} onPress={onPress} android_ripple={{ foreground: true, borderless: false }}>
      <Icon name={icon} size={24} color={colors.placeholder} style={styles.tileIcon} />
      <Text style={styles.tileTitle}>{title}</Text>
      <Text style={styles.tileValue}>    •   {value}</Text>
    </Pressable>
  );
}

const PlayerOptions = ({ sheetRef }) => {
  const snapPoints = useMemo(() => ['43%', '70%'], []);
  const { options, availableQualities, setPlayerOptions, playbackSpeeds } = useContext(PlayerOptionsContext);
  const [showQualities, setShowQualities] = useState(false);
  const [showPlaybackSpeed, setShowplaybackSpeed] = useState(false);

  const Default = () => {
    return (
      <>
        <PlayerOptionTile
          title="Quality"
          icon="settings"
          onPress={() => setShowQualities(true)}
          value={options.quality}
        />
        <PlayerOptionTile
          title="Playback Speed"
          icon="fast-forward"
          onPress={() => setShowplaybackSpeed(true)}
          value={options.playbackSpeed === 1 ? "Normal" : options.playbackSpeed + "x"}
        />
        <PlayerOptionTile
          title="Loop video"
          icon="repeat"
          onPress={() => setPlayerOptions({ ...options, repeat: !options.repeat })}
          value={options.repeat ? "On" : "Off"}
        />
        <PlayerOptionTile
          title="Auto Play"
          icon="skip-forward"
          onPress={() => setPlayerOptions({ ...options, autoPlay: !options.autoPlay })}
          value={options.autoPlay ? "On" : "Off"}
        />
      </>
    )
  }

  const Qualities = () => {
    const sheet = useBottomSheet();
    return (
      <>
        {availableQualities.map(item => (
          <Pressable
            key={item}
            style={styles.tile}
            android_ripple={{ foreground: true, borderless: false }}
            onPress={() => { setPlayerOptions({ ...options, quality: item }); setShowQualities(false); sheet.close() }}>
            {options.quality === item && <Icon name="check" size={24} style={styles.tileIcon} />}
            {options.quality !== item && <View style={{ width: 44 }} />}
            <Text style={styles.tileTitle}>{item}</Text>
          </Pressable>
        ))}
      </>
    );
  }

  const PlaybackSpeed = () => {
    const sheet = useBottomSheet();
    return (
      <>
        {playbackSpeeds.map(item => (
          <Pressable
            key={item}
            style={styles.tile}
            android_ripple={{ foreground: true, borderless: false }}
            onPress={() => { setPlayerOptions({ ...options, playbackSpeed: item }); setShowplaybackSpeed(false); sheet.close() }}>
            {options.playbackSpeed === item && <Icon name="check" size={24} style={styles.tileIcon} />}
            {options.playbackSpeed !== item && <View style={{ width: 44 }} />}
            <Text style={styles.tileTitle}>{item}</Text>
          </Pressable>
        ))}
      </>
    );
  }

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        enableTouchThrough={false}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      ref={sheetRef}
      style={{
        overflow: 'hidden',
        borderRadius: 10,
        elevation: 20,
      }}
      backdropComponent={renderBackdrop}
      snapPoints={snapPoints}>
      <View style={styles.contentContainer}>
        {showQualities && <Qualities />}
        {showPlaybackSpeed && <PlaybackSpeed />}
        {!showPlaybackSpeed && !showQualities && <Default />}
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },

  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },

  tileIcon: {
    marginRight: 20,
    color: Colors.grey700
  },

  tileTitle: {
    fontSize: 16,
    color: Colors.grey700
  },

  tileValue: {
    color: Colors.grey700
  }
});

export default PlayerOptions;