import { useContext } from 'react';
import { View, FlatList, StatusBar } from 'react-native';
import EpisodeTile from '../components/episodeTile';
import SeriesHeader from '../components/seriesHeader';
import { SeriesContext } from '../contexts/seriesContext';

const Series = ({ route }) => {
  const { series } = route.params;
  const episodes = useContext(SeriesContext).episodes.filter(ep => ep.seriesId === series.id);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor='#0000004d' translucent/>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<SeriesHeader series={series} />}
        data={episodes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <EpisodeTile key={item.id} episode={item} />}
      />
    </View>
  );
}

export default Series;