import {createContext, useState, useEffect} from 'react';
import Storage from '../storage';

export const PlayerOptionsContext = createContext();

const PlayerOptionsContextProvider = props => {
  const [options, setOptions] = useState(Storage.defaultOptions);
  const [source, setSource] = useState(null);
  const [availableQualities, setAvailableQualities] = useState([]);

  useEffect(() => {
    Storage.getPlayerOptions().then(setOptions);
  }, []);

  const setPlayerOptions = opt => {
    let newOpt = opt;

    if (options.repeat !== newOpt.repeat) {
      if (newOpt.repeat) {
        newOpt.autoPlay = false;
      }
    }

    if (options.autoPlay !== newOpt.autoPlay) {
      if (newOpt.autoPlay) {
        newOpt.repeat = false;
      }
    }

    Storage.setPlayerOptions(newOpt).then(setOptions);
  };

  return (
    <PlayerOptionsContext.Provider
      value={{
        options,
        setPlayerOptions,
        availableQualities,
        setAvailableQualities,
        source,
        setSource,
        playbackSpeeds: Storage.playbackSpeeds,
      }}>
      {props.children}
    </PlayerOptionsContext.Provider>
  );
};

export default PlayerOptionsContextProvider;
