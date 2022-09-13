import { useState, useContext, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { Colors } from "react-native-paper";
import { SeriesContext } from "../contexts/seriesContext";
import { HistoryContext } from '../contexts/historyContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Player from '../components/player';
import PlayerOptions from '../components/playerOptions';

const Watch = ({ route }) => {
  const { episode } = route.params;
  const [currentEpisode, setCurrentEpisode] = useState(episode);
  const [showDescription, setShowDescription] = useState(false);
  const { history } = useContext(HistoryContext);
  const episodes = useContext(SeriesContext).episodes.filter(ep => ep.seriesId === currentEpisode.seriesId);
  const series = useContext(SeriesContext).series[currentEpisode.seriesId];
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    const episodeFromHistory = history.filter(item => item.identifier === episode.identifier);
    if (episodeFromHistory.length > 0) setCurrentEpisode(episodeFromHistory[0]);
  }, []);

  const _handleIncomingVideo = (mode) => {
    const next = mode === 'next' ? +1 : -1;
    const incoming = episodes[currentEpisode.id - 1 + next];
    const fromHistory = history.filter(item => item.identifier === incoming.identifier)[0];
    setCurrentEpisode(fromHistory || incoming);
  }

  return (
    <BottomSheetModalProvider>
      <StatusBar backgroundColor='black'/>
      <Player
        sheetRef={bottomSheetRef}
        episode={currentEpisode}
        handleIncomingVideo={_handleIncomingVideo} />

      <ScrollView style={styles.container}>
        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={{ color: Colors.grey600 }}>{series.title} | E{currentEpisode.id.toString().padStart(2, "0")}</Text>
          <Text style={styles.title}>{currentEpisode.title}</Text>
          <Pressable onPress={() => setShowDescription(!showDescription)}>
            <Text style={styles.description} numberOfLines={showDescription ? undefined : 5}>{currentEpisode.description}</Text>
            <Text style={styles.showMoreBtn}>{showDescription ? "SHOW LESS" : "SHOW MORE"}</Text>
          </Pressable>
        </View>
      </ScrollView>
      <PlayerOptions sheetRef={bottomSheetRef} />
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  player: {
    backgroundColor: Colors.grey900,
  },

  title: {
    fontSize: 24,
    marginVertical: 5,
    color: Colors.grey800,
    textTransform: 'capitalize',
  },

  description: {
    fontSize: 16,
    color: Colors.grey800
  },

  showMoreBtn: {
    marginVertical: 5,
    fontWeight: '500',
    color: Colors.blueA200,
  }
});

export default Watch;