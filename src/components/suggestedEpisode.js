import { useContext, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors, IconButton, useTheme } from "react-native-paper";
import { SeriesContext } from "../contexts/seriesContext";
import HistoryTile from "./historyTile";

const SuggestedEpisode = () => {
  const { colors } = useTheme();
  const [random, setRandom] = useState(0);
  const { series, episodes } = useContext(SeriesContext);
  const episode = useMemo(() => episodes[random], [random]);

  const getRandom = () => {
    // const random = (Math.random() * (max - min + 1) + min)
    return Math.floor(Math.random() * (episodes.length + 1));
  }

  useEffect(() => {
    setRandom(getRandom());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Suggested</Text>
        <IconButton
          icon="refresh"
          color={colors.placeholder}
          onPress={() => setRandom(getRandom())}
        />
      </View>
      <HistoryTile episode={episode} seriesName={series[episode.seriesId].title} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 0,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 18,
    color: Colors.grey700
  }
});

export default SuggestedEpisode;