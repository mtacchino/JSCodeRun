import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions, DrawerItems } from 'react-navigation';
import { View } from 'react-native';
import MainScreen from './screens/MainScreen';
import DrawerMenu from './components/DrawerMenu';

export const ScreenNames = {
    HOME_SCREEN: 'Home',
    EXAMPLES_SCREEN: 'EXAMPLES',
    ABOUT_SCREEN: 'ABOUT'
}

const drawerNavigatorConfig = {
  contentComponent: DrawerMenu,
  drawerWidth: 270
}

const AppNavigator = DrawerNavigator({
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

class App extends Component {
  render() {
    return (
      <AppNavigator
        ref={nav => {
            this.navigator = nav;
        }}
        onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }
}


export default App;