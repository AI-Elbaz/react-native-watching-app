import { useContext } from "react";
import { StyleSheet, View, Text, FlatList, Alert } from "react-native";
import { HistoryContext } from "../contexts/historyContext";
import HistoryTile from "../components/historyTile";
import { SeriesContext } from "../contexts/seriesContext";
import { Button, Colors } from "react-native-paper";
import EmptyListView from "../components/emptyListView";

export const HistoryDeleteBtn = () => {
  const { history, clearHistory } = useContext(HistoryContext);

  const confirmClearHistory = () =>
    Alert.alert(
      "Notice",
      "This action will delete your entire watch history permanently.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: clearHistory }
      ],
      { cancelable: true }
    );

  return (
    <>
      {history.length > 0 && <Button color={Colors.red400} onPress={confirmClearHistory}>clear</Button>}
    </>
  );
}

const History = () => {
  const { history } = useContext(HistoryContext);
  const { series } = useContext(SeriesContext);

  return (
    <FlatList
      data={history}
      style={styles.container}
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyListView icon='clock' text="Have A Good Time" />}
      keyExtractor={(item) => item.identifier}
      ItemSeparatorComponent={() => <View style={{ height: 15 }}></View>}
      renderItem={({ item }) => <HistoryTile episode={item} seriesName={series[item.seriesId].title} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: 'white',
  },
});

export default History;