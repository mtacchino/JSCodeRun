import { DrawerNavigator, NavigationActions, DrawerItems } from 'react-navigation';
import { View } from 'react-native';
import MainScreen from '../screens/MainScreen';
import DrawerMenu from './DrawerMenu';

export const ScreenNames = {
    HOME_SCREEN: 'Home',
    EXAMPLES_SCREEN: 'EXAMPLES',
    ABOUT_SCREEN: 'ABOUT'
}

const drawerNavigatorConfig = {
  contentComponent: DrawerMenu,
  drawerWidth: 270
}

export default AppNavigator = DrawerNavigator({
    [ScreenNames.HOME_SCREEN]: {
      screen: MainScreen,
      navigationOptions: () => ({
        drawerLabel: () => null
      })
    },
    [ScreenNames.EXAMPLES_SCREEN]: {
      screen: MainScreen
    },
    [ScreenNames.ABOUT_SCREEN]: {
      screen: MainScreen
    },
}, drawerNavigatorConfig);