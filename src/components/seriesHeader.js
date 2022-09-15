import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable
} from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { Colors, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import LinearGradient from "react-native-linear-gradient";
import { HistoryContext } from "../contexts/historyContext";
import { SharedElement } from "react-navigation-shared-element";
import { SeriesContext } from "../contexts/seriesContext";

const SeriesHeader = ({ series }) => {
  const { colors } = useTheme();
  const { history } = useContext(HistoryContext);
  const navigation = useNavigation();
  const episodes = useContext(SeriesContext).episodes.filter(ep => ep.seriesId === series.id);
  const lastEpisode = history.filter(ep => ep.seriesId === series.id && ep.watchPercentage !== 1);

  return (
    <>
      <View style={styles.header}>
        <SharedElement id={`series.${series.id}.photo`}>
          <Image source={series.poster} style={styles.image} resizeMode="cover" />
        </SharedElement>
        <LinearGradient colors={['transparent', 'black']} style={[StyleSheet.absoluteFill, styles.gradient]}>
          <Text style={styles.seriesTitle}>{series.title}</Text>
          <Text style={styles.episodesNumber}>{series.episodes} Episode</Text>
        </LinearGradient>
      </View>
      <Pressable
        android_ripple={{ foreground: true, borderless: false }}
        onPress={() => navigation.navigate('Watch', { episode: lastEpisode.length > 0 ? lastEpisode[0] : episodes[0] })}
        style={styles.playBtn}>
        <Icon name="play" size={36} color={colors.placeholder} />
      </Pressable>
      <Text style={styles.seriesDescription}>{series.description}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 400,
    elevation: 10,
    overflow: 'hidden',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },

  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },

  gradient: {
    paddingHorizontal: 10,
    paddingBottom: 60,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  seriesTitle: {
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  episodesNumber: {
    fontSize: 20,
    fontWeight: '300',
    color: Colors.grey400,
  },

  playBtn: {
    padding: 15,
    borderRadius: 100,
    flexDirection: 'row',
    overflow: 'hidden',
    alignSelf: 'flex-end',
    marginRight: 60,
    backgroundColor: 'white',
    marginTop: -40,
    elevation: 5
  },

  seriesDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
    color: Colors.grey600,
  },
});

export default SeriesHeader;