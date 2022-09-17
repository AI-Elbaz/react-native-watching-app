import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {
  Colors,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import SeriesContextProvider from './src/contexts/seriesContext';
import HistoryContextProvider from './src/contexts/historyContext';
import PlayerOptionsContextProvider from './src/contexts/playerOptionsContext';

import Home from './src/pages/home';
import Search from './src/pages/search';
import Series from './src/pages/series';
import Watch from './src/pages/watch';
import History, {HistoryDeleteBtn} from './src/pages/history';

const Stack = createNativeStackNavigator();
const theme = {
  ...DefaultTheme,
  roundness: 15,
  padding: 20,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    surface: Colors.grey100,
  },
};

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PlayerOptionsContextProvider>
        <HistoryContextProvider>
          <SeriesContextProvider>
            <PaperProvider theme={theme}>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{headerShown: false, orientation: 'portrait'}}>
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen
                    name="History"
                    component={History}
                    options={{headerShown: true, headerRight: HistoryDeleteBtn}}
                  />
                  <Stack.Screen name="Search" component={Search} />
                  <Stack.Screen name="Series" component={Series} />
                  <Stack.Screen
                    name="Watch"
                    component={Watch}
                    options={{orientation: 'all'}}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </PaperProvider>
          </SeriesContextProvider>
        </HistoryContextProvider>
      </PlayerOptionsContextProvider>
    </GestureHandlerRootView>
  );
}
