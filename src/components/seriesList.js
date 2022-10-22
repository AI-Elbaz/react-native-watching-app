import {useContext} from 'react';
import {Dimensions} from 'react-native';
import {SeriesContext} from '../contexts/seriesContext';
import Carousel from 'react-native-snap-carousel-v4';
import SeriesCard from './seriesCard';

const SeriesList = () => {
  const {series} = useContext(SeriesContext);

  return (
    <Carousel
      data={series}
      itemWidth={Dimensions.get('window').width / 1.267}
      containerCustomStyle={{flexGrow: 0}}
      sliderWidth={Dimensions.get('window').width}
      renderItem={({item}) => <SeriesCard key={item.id} series={item} />}
    />
  );
};

export default SeriesList;
