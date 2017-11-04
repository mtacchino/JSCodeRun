import React from 'react';
import { DrawerNavigator, NavigationActions, DrawerItems } from 'react-navigation';
import { View, Image, StyleSheet } from 'react-native';
import MainScreen from '../screens/MainScreen';
import DrawerMenu from './DrawerMenu';

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    tintColor: 'black'
  }
});

export const ScreenNames = {
  HOME_SCREEN: 'Home',
  EXAMPLES_SCREEN: 'EXAMPLES',
  ABOUT_SCREEN: 'ABOUT',
  FILE_OPEN_SCREEN: 'OPEN',
  FILE_SAVE_AS_SCREEN: 'SAVE AS'
};

const drawerNavigatorConfig = {
  contentComponent: DrawerMenu,
  drawerWidth: 270
};

const DrawerIcon = ({ iconName }) => (
  <Image source={require(`../../assets/${iconName}-icon.png`)} style={styles.icon} />
);

export default DrawerNavigator(
  {
    [ScreenNames.HOME_SCREEN]: {
      screen: MainScreen,
      navigationOptions: () => ({
        drawerLabel: () => null
      })
    },
    [ScreenNames.FILE_OPEN_SCREEN]: {
      screen: MainScreen,
      navigationOptions: () => ({
        drawerIcon: () => <DrawerIcon iconName="open" />
      })
    },
    [ScreenNames.FILE_SAVE_AS_SCREEN]: {
      screen: MainScreen,
      navigationOptions: () => ({
        drawerIcon: () => <DrawerIcon iconName="open" />
      })
    },
    [ScreenNames.EXAMPLES_SCREEN]: {
      screen: MainScreen,
      navigationOptions: () => ({
        drawerIcon: () => <DrawerIcon iconName="open" />
      })
    },
    [ScreenNames.ABOUT_SCREEN]: {
      screen: MainScreen,
      navigationOptions: () => ({
        drawerIcon: () => <DrawerIcon iconName="open" />
      })
    }
  },
  drawerNavigatorConfig
);
