import { registerRootComponent } from 'expo';

import App from './App';
import SplashScreen from './Screen/SplashScreen';
import LoginScreen from './Screen/LoginScreen';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
