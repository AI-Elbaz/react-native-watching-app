import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "react-native-paper";

const EpisodeTile = ({ episode }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('Watch', { episode })}
      android_ripple={{ foreground: true, borderless: false, color: Colors.grey500 }}>
      <View style={{ ...styles.container, backgroundColor: (episode.id -1) % 2 ? Colors.grey50 : 'transparent' }}>
        <Text style={styles.episodeNumber}>{episode.id.toString().padStart(2, '0')}</Text>
        <View style={{ alignItems: 'flex-start', flexShrink: 1 }}>
          <Text style={{ fontSize: 18, textTransform: 'capitalize' }} numberOfLines={2}>{episode.title}</Text>
          <Text style={{ color: Colors.grey600 }} numberOfLines={2}>{episode.description}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  episodeNumber: {
    fontSize: 64,
    fontWeight: 'bold',
    marginRight: 15,
    letterSpacing: -5,
    color: Colors.grey300,
  },
});

export default EpisodeTile;