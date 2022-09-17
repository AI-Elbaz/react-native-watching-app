import {Text, View, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native-paper';

const EpisodeTile = ({episode}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate('Watch', {episode})}
      android_ripple={{
        foreground: true,
        borderless: false,
        color: Colors.grey500,
      }}>
      <View
        style={{
          ...styles.container,
          backgroundColor: (episode.id - 1) % 2 ? Colors.grey50 : 'transparent',
        }}>
        <Text style={styles.episodeNumber}>
          {episode.id.toString().padStart(2, '0')}
        </Text>
        <View style={{alignItems: 'flex-start', flexShrink: 1}}>
          <Text style={styles.title} numberOfLines={2}>
            {episode.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {episode.description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  episodeNumber: {
    fontSize: 64,
    width: '20%',
    textAlign: 'center',
    lineHeight: 70,
    marginRight: 15,
    letterSpacing: -4,
    color: Colors.grey300,
    fontFamily: 'YouTubeSansBold',
  },

  title: {
    fontSize: 18,
    color: Colors.grey700,
    textTransform: 'capitalize',
    fontFamily: 'YouTubeSansSemibold',
  },

  description: {
    color: Colors.grey600,
    fontFamily: 'YouTubeSansRegular',
  },
});

export default EpisodeTile;
