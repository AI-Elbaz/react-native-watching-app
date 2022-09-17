import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static defaultOptions = {
    autoPlay: false,
    repeat: false,
    quality: '360p',
    playbackSpeed: 1,
  };

  static playbackSpeeds = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  static async getHistory() {
    const data = (await AsyncStorage.getItem('history')) || '[]';
    return JSON.parse(data);
  }

  static async addToHistory(episode) {
    let history = await this.getHistory();
    history = history.filter(ep => ep.identifier !== episode.identifier);
    history.unshift(episode);
    await AsyncStorage.setItem('history', JSON.stringify(history));
    return history;
  }

  static async clearHistory() {
    await AsyncStorage.setItem('history', '[]');
    return [];
  }

  static async getPlayerOptions() {
    const options = await AsyncStorage.getItem('playerOptions');
    if (options) {
      return JSON.parse(options);
    }
    return this.defaultOptions;
  }

  static async setPlayerOptions(options) {
    await AsyncStorage.setItem('playerOptions', JSON.stringify(options));
    return options;
  }
}

export default Storage;
