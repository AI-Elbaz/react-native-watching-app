# Watching App
![Preview image](https://repository-images.githubusercontent.com/535854822/0ad4f54a-57e8-4ced-9866-672921bfe2ba)

## installation
1. clone the repository to your machine
    
    `git clone https://github.com/AboodIbrahim/react-native-watching-app.git`

2. run `npm install` in the project directory

3. run the app on an android device or a simulator `npm run android`

## Features
- Searching through the episodes
- A history to store watching progress, if the episode wasn't finished it stores the time it was left on
- suggested episode shows a random episode and could be refreshed
- "Watch now" button plays the last watched episode in a specific series
- A YouTube-like video player
  - Play the episode in multiple qualities
  - Change the speed of the playback
  - Autoplay to automatically start the incoming episode
  - Double tap to seek forward and backward
  - Rotate the screen to automatically switch to fullscreen mode
  - Shows the size of the episode in Megabytes

### TODO
- [ ] fix: switching to fullscreen mode glitch
- [ ] fix: autoplay skips an episode
- [ ] feature: add animations to the player controls
- [ ] feature: enhance video loading
- [ ] feature: add dark mode
