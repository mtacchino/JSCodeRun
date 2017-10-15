import React from 'react';
import { DrawerItems } from 'react-navigation';
import { View, StyleSheet, Image, Platform } from 'react-native';
import fonts from '../themes/fonts';

const styles = StyleSheet.create({
  container: {
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 30,
    backgroundColor: '#222'
  },
  logo: {
    height: 150,
    width: 150
  },
  itemWrapper: {
    marginTop: 10
  },
  itemLabels: {
    fontSize: 22,
    paddingLeft: 20,
    fontFamily: fonts.fontFamily
  }
});

export default DrawerMenu = props =>
  <View style={styles.container}>
    <View style={styles.logoWrapper}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
    </View>
    <View style={styles.itemWrapper}>
      <DrawerItems labelStyle={styles.itemLabels} {...props} />
    </View>
  </View>
