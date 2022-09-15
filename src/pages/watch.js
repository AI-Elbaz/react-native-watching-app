import { useState, useContext, useEffect, useRef, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Colors } from "react-native-paper";
import { SeriesContext } from "../contexts/seriesContext";
import { HistoryContext } from '../contexts/historyContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Player from '../components/player';
import PlayerOptions from '../components/playerOptions';
import ExpandableText from '../components/expandableText';

const Watch = ({ route }) => {
  const { episode } = route.params;
  const [currentEpisode, setCurrentEpisode] = useState(episode);
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
      <StatusBar backgroundColor='transparent' translucent />

      <Player
        episode={currentEpisode}
        sheetRef={bottomSheetRef}
        handleIncomingVideo={_handleIncomingVideo} />

      <ScrollView style={styles.container}>
        <View style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={styles.seriesName}>{series.title} | E{currentEpisode.id.toString().padStart(2, "0")}</Text>
          <Text style={styles.title}>{currentEpisode.title}</Text>
          {useMemo(() => <ExpandableText numberOfLines={4} style={styles.description}>
            {currentEpisode.description}
          </ExpandableText>, [currentEpisode.description])}
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

  seriesName: {
    fontSize: 16,
    color: Colors.grey600,
    fontFamily: 'YouTubeSansRegular',
  },

  title: {
    fontSize: 22,
    color: Colors.grey800,
    textTransform: 'capitalize',
    fontFamily: 'YouTubeSansSemibold'
  },

  description: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.grey800,
    fontFamily: 'YouTubeSansRegular'
  },
});

export default Watch;