import {StyleSheet, Image, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Colors, IconButton} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const SeriesHeader = ({series}) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        height: '50%',
        width: '100%',
      }}>
      <View>
        <Image source={series.poster} style={styles.image} resizeMode="cover" />
        <LinearGradient
          colors={['black', 'transparent', 'transparent', 'black']}
          style={[StyleSheet.absoluteFill, {paddingTop: 35}]}>
          <IconButton
            size={28}
            icon="arrow-left"
            style={{zIndex: 1}}
            onPress={() => navigation.goBack()}
            color={Colors.grey300}
          />
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default SeriesHeader;
