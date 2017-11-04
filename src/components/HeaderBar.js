import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: '100%',
    marginTop: Platform.OS === 'ios' ? 20 : 0
  },
  headerBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10
  },
  headerText: {
    fontSize: 22,
    color: 'white'
  },
  runButton: {
    height: 40,
    width: 40
  },
  hamburger: {
    height: 35,
    width: 35,
    tintColor: 'white'
  }
});

export default ({ navigation, runCode }) => (
  <View style={styles.container}>
    <View style={styles.headerBar}>
      <TouchableOpacity onPress={() => navigation.navigate('DrawerOpen')}>
        <Image style={styles.hamburger} source={require('../../assets/hamburger.png')} />
      </TouchableOpacity>
      <Text style={styles.headerText}>JS Code Run</Text>
      <TouchableOpacity onPress={() => runCode()}>
        <Image style={styles.runButton} source={require('../../assets/run.png')} />
      </TouchableOpacity>
    </View>
  </View>
);
