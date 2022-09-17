import {useContext, useEffect, useState} from 'react';
import {StyleSheet, TextInput, View, FlatList} from 'react-native';
import {IconButton, useTheme} from 'react-native-paper';
import {SeriesContext} from '../contexts/seriesContext';
import Icon from 'react-native-vector-icons/Feather';
import HistoryTile from '../components/historyTile';
import EmptyListView from '../components/emptyListView';

const Search = ({navigation}) => {
  const {episodes} = useContext(SeriesContext);
  const {series} = useContext(SeriesContext);
  const {colors, roundness} = useTheme();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (query) {
      setResult(
        episodes.filter(
          episode => episode.title.indexOf(query.toLowerCase()) > -1,
        ),
      );
    } else {
      setResult([]);
    }
  }, [query, episodes]);

  return (
    <View style={styles.container}>
      <View
        style={{paddingRight: 15, paddingVertical: 15, flexDirection: 'row'}}>
        <IconButton
          icon="arrow-left"
          color={colors.placeholder}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.searchBar(colors.surface, roundness)}>
          <Icon name="search" size={24} color={colors.placeholder} />
          <TextInput
            value={query}
            autoFocus
            onChangeText={setQuery}
            placeholder="Search"
            placeholderTextColor={colors.placeholder}
            selectionColor={colors.placeholder}
            style={styles.input}
          />
          {query && (
            <Icon
              name="x"
              size={24}
              color={colors.placeholder}
              onPress={() => setQuery('')}
            />
          )}
        </View>
      </View>
      <FlatList
        data={result}
        contentContainerStyle={{flexGrow: 1}}
        style={{paddingHorizontal: 15}}
        ListEmptyComponent={
          <EmptyListView icon="search" text="Type something" />
        }
        keyExtractor={item => item.identifier}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{height: 15}} />}
        renderItem={({item}) => (
          <HistoryTile
            episode={item}
            seriesName={series[item.seriesId].title}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: 'white',
  },

  searchBar: (color, roundness) => ({
    flex: 1,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: roundness,
    backgroundColor: color,
  }),

  input: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    color: 'black',
  },
});

export default Search;
