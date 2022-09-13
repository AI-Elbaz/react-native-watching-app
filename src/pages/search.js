import { useContext, useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, FlatList } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper';
import { SeriesContext } from '../contexts/seriesContext';
import Icon from "react-native-vector-icons/Feather";
import HistoryTile from '../components/historyTile';

const Search = ({ navigation }) => {
  const { episodes } = useContext(SeriesContext);
  const { series } = useContext(SeriesContext);
  const { colors, roundness } = useTheme();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (query)
      setResult(
        episodes.filter(episode => episode.title.indexOf(query.toLowerCase()) > -1)
      );
    else setResult([]);
  }, [query]);

  return (
    <View style={styles.container}>
      <View style={{ paddingRight: 15, paddingVertical: 15, flexDirection: 'row' }}>
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
            clearButtonMode='always'
            onChangeText={setQuery}
            placeholder="Search"
            style={styles.input}
            selectionColor={colors.placeholder} />
          {query && <Icon name="x" size={24} color={colors.placeholder} onPress={() => setQuery('')} />}
        </View>
      </View>
      <FlatList
        data={result}
        style={{ paddingHorizontal: 15 }}
        keyExtractor={item => item.identifier}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 15 }}></View>}
        renderItem={({ item }) => <HistoryTile episode={item} seriesName={series[item.seriesId].title} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: 'black'
  }
});

export default Search;