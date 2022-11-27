import {useContext} from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import {Button, Colors} from 'react-native-paper';
import EpisodeTile from '../components/episodeTile';
import SeriesHeader from '../components/seriesHeader';
import {SeriesContext} from '../contexts/seriesContext';
import {HistoryContext} from '../contexts/historyContext';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet';

const Series = ({route, navigation}) => {
  const {series} = route.params;
  const {history} = useContext(HistoryContext);

  const episodes = useContext(SeriesContext).episodes.filter(
    ep => ep.seriesId === series.id,
  );

  const lastEpisode = history.filter(
    ep => ep.seriesId === series.id && ep.watchPercentage !== 0,
  );

  const CustomBackdrop = props => {
    return (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={false}
        pressBehavior="none"
      />
    );
  };

  const CustomFooter = props => {
    return (
      <BottomSheetFooter {...props} style={{backgroundColor: 'transparent'}}>
        <LinearGradient colors={['transparent', 'white']} style={{padding: 20}}>
          <Button
            onPress={() =>
              navigation.navigate('Watch', {
                episode: lastEpisode.length > 0 ? lastEpisode[0] : episodes[0],
              })
            }
            mode="contained"
            color={Colors.grey900}
            labelStyle={{fontSize: 18}}
            contentStyle={{padding: 4}}
            style={{alignSelf: 'center'}}>
            Watch Now
          </Button>
        </LinearGradient>
      </BottomSheetFooter>
    );
  };

  const BottomSheetBackground = ({style}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          ...style,
        }}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor="transparent" animated translucent />
      <SeriesHeader series={series} />
      <BottomSheet
        snapPoints={['60%', '89%']}
        handleComponent={null}
        backgroundComponent={BottomSheetBackground}
        backdropComponent={CustomBackdrop}
        footerComponent={CustomFooter}>
        <BottomSheetFlatList
          data={episodes}
          style={{marginTop: 40}}
          keyExtractor={item => item.identifier}
          renderItem={({item}) => <EpisodeTile key={item.id} episode={item} />}
          ListFooterComponent={
            <View
              style={{
                height: 85,
                borderTopColor: Colors.grey200,
                borderTopWidth: 1,
              }}
            />
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.title}>{series.title}</Text>
              <Text style={styles.episodes}>{series.episodes} Episode</Text>
              <Text style={styles.description}>{series.description}</Text>
            </View>
          }
        />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 36,
    color: Colors.grey800,
    fontFamily: 'YouTubeSansSemibold',
  },
  episodes: {
    fontSize: 20,
    lineHeight: 22,
    color: Colors.grey500,
    fontFamily: 'YouTubeSansRegular',
  },
  description: {
    fontSize: 16,
    color: Colors.grey600,
    marginTop: 12,
    fontFamily: 'YouTubeSansRegular',
  },
});

export default Series;
