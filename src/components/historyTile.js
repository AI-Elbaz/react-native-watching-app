import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native-paper";

const HistoryTile = ({ episode, seriesName }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      android_ripple={{ foreground: true, borderless: false }}
      style={styles.container}
      onPress={() => navigation.navigate('Watch', { episode })}>
      {episode.watchPercentage && episode.watchPercentage !== 1 && <View style={styles.progressbarContainer}>
        <View style={{ ...styles.progressBar, height: episode.watchPercentage * 100 + '%' }}></View>
      </View>}
      <View style={{ flexShrink: 1 }}>
        <Text style={styles.seriesName}>{seriesName} | E{episode.id.toString().padStart(2, "0")}</Text>
        <Text style={styles.title} numberOfLines={2}>{episode.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{episode.description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: Colors.grey100,
  },

  title: {
    fontSize: 20,
    color: Colors.grey800,
    textTransform: 'capitalize',
    fontFamily: 'YouTubeSansSemibold',
  },

  seriesName: {
    color: Colors.grey600,
    fontFamily: 'YouTubeSansRegular',
  },

  description: {
    color: Colors.grey800,
    fontFamily: 'YouTubeSansRegular',
  },

  progressbarContainer: {
    width: 5,
    marginRight: 10,
    borderRadius: 5,
    justifyContent: 'flex-end',
    backgroundColor: Colors.grey300,
  },

  progressBar: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: Colors.red400,
  }
});

export default HistoryTile;