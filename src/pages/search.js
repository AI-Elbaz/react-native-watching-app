import {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import {Colors, IconButton, useTheme} from 'react-native-paper';
import {SeriesContext} from '../contexts/seriesContext';
import Icon from 'react-native-vector-icons/Feather';
import HistoryTile from '../components/historyTile';
import EmptyListView from '../components/emptyListView';

const Search = ({navigation}) => {
  const {episodes} = useContext(SeriesContext);
  const {series} = useContext(SeriesContext);
  const {colors} = useTheme();
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
      <StatusBar backgroundColor={'white'} translucent />
      <View style={styles.searchBar}>
        <IconButton
          icon="arrow-left"
          color={colors.placeholder}
          onPress={() => navigation.goBack()}
        />
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
      <FlatList
        data={result}
        contentContainerStyle={{flexGrow: 1}}
        style={{padding: 15}}
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
    backgroundColor: 'white',
    paddingTop: StatusBar.currentHeight,
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey300,
  },

  input: {
    flex: 1,
    fontSize: 18,
    color: 'black',
  },
});

export default Search;
