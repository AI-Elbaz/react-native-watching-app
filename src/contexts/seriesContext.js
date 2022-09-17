import {createContext} from 'react';

export const SeriesContext = createContext();

const SeriesContextProvider = props => {
  const series = require('../data/series.min.json');
  const episodes = require('../data/episodes.min.json');

  const posters = [
    require('../../assets/images/ben_10_classic.jpeg'),
    require('../../assets/images/ben_10_alien_force.jpeg'),
    require('../../assets/images/ben_10_ultimate_alien.jpeg'),
    require('../../assets/images/ben_10_omniverse.jpeg'),
  ];

  series.forEach((s, i) => (s.poster = posters[i]));

  return (
    <SeriesContext.Provider value={{series, episodes}}>
      {props.children}
    </SeriesContext.Provider>
  );
};

export default SeriesContextProvider;
