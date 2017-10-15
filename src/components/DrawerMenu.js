import React from 'react';
import { DrawerItems } from 'react-navigation';
import { View, StyleSheet, Image, Platform, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import fonts from '../themes/fonts';

const styles = StyleSheet.create({
  container: {
    height:'100%'
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
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
  },
  footer: {
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  footerText: {
    color: '#9876aa'
  }
});

const appVersion = DeviceInfo.getVersion();

export default DrawerMenu = props =>
  <View style={styles.container}>
    <View style={styles.logoWrapper}>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
    </View>
    <View style={styles.itemWrapper}>
      <DrawerItems labelStyle={styles.itemLabels} {...props} />
    </View>
    <View style={styles.footer}>
      <Text style={styles.footerText}>Version {appVersion}</Text>
    </View>
  </View>
