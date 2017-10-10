import React, { Component } from 'react';
import { DrawerNavigator, NavigationActions } from 'react-navigation';
import MainScreen from './screens/MainScreen';

export const ScreenNames = {
    HOME_SCREEN: 'Home',
    EXAMPLES_SCREEN: 'Code examples',
    ABOUT_SCREEN: 'About'
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
});

class App extends Component {
  routeTo(screenName) {
    // call navigate for AppNavigator here:
    this.navigator && this.navigator.dispatch(
      NavigationActions.navigate({ routeName: screenName })
    );
  }

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