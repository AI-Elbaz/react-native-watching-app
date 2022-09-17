import {useContext} from 'react';
import {View, FlatList, StatusBar} from 'react-native';
import EpisodeTile from '../components/episodeTile';
import SeriesHeader from '../components/seriesHeader';
import {SeriesContext} from '../contexts/seriesContext';

const Series = ({route}) => {
  const {series} = route.params;
  const episodes = useContext(SeriesContext).episodes.filter(
    ep => ep.seriesId === series.id,
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="transparent" translucent animated />
      <FlatList
        data={episodes}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<SeriesHeader series={series} />}
        keyExtractor={item => item.id}
        renderItem={({item}) => <EpisodeTile key={item.id} episode={item} />}
      />
    </View>
  );
};

export default Series;
