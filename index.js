import { registerRootComponent } from 'expo';

import App from './App';
import HomeScreen from './Screen/(tabs)/Home';
import index from './Screen/(tabs)/index'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
