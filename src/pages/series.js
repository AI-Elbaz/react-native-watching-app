import {useContext, useRef} from 'react';
import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  Animated,
} from 'react-native';
import {Colors} from 'react-native-paper';
import EpisodeTile from '../components/episodeTile';
import SeriesHeader from '../components/seriesHeader';
import {SeriesContext} from '../contexts/seriesContext';

const Series = ({route}) => {
  const {series} = route.params;
  const episodes = useContext(SeriesContext).episodes.filter(
    ep => ep.seriesId === series.id,
  );

  const animation = useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="transparent" animated translucent />
      <FlatList
        data={episodes}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: animation}}}],
          {useNativeDriver: false},
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <SeriesHeader series={series} animation={animation} />
        }
        stickyHeaderIndices={[0]}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => {
          if (index === 0) {
            return (
              <>
                <Text style={styles.description}>{series.description}</Text>
                <EpisodeTile key={item.id} episode={item} />
              </>
            );
          }
          return <EpisodeTile key={item.id} episode={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: Colors.grey600,
    fontFamily: 'YouTubeSansRegular',
  },
});

export default Series;
