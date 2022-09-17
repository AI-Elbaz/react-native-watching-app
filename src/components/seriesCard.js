import {Text, Pressable, StyleSheet, Image} from 'react-native';
import {Colors} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {SharedElement} from 'react-navigation-shared-element';

const SeriesCard = ({series}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      android_ripple={{
        foreground: true,
        borderless: false,
        color: Colors.grey900,
      }}
      onPress={() => navigation.navigate('Series', {series})}
      style={styles.container}>
      <SharedElement id={`series.${series.id}.photo`}>
        <Image source={series.poster} style={styles.image} resizeMode="cover" />
      </SharedElement>
      <LinearGradient
        colors={['transparent', '#00000033', 'black']}
        style={[StyleSheet.absoluteFill, styles.gradient]}>
        <Text style={styles.title}>{series.title}</Text>
        <Text style={styles.episodes}>{series.episodes} Episode</Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 420,
    borderRadius: 30,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },

  gradient: {
    padding: 20,
    justifyContent: 'flex-end',
  },

  title: {
    fontSize: 30,
    color: 'white',
    fontFamily: 'YouTubeSansBold',
  },

  episodes: {
    fontSize: 18,
    color: Colors.grey500,
    fontFamily: 'YouTubeSansRegular',
  },
});

export default SeriesCard;
