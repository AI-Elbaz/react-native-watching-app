import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';

const EmptyListView = ({icon, text}) => {
  return (
    <View style={styles.container}>
      <Icon
        name={icon}
        size={Dimensions.get('window').width / 2.5}
        color={Colors.grey200}
      />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 24,
    color: Colors.grey400,
    marginVertical: 32,
    fontFamily: 'YouTubeSansRegular',
  },
});

export default EmptyListView;
