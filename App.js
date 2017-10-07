import React, { Component } from 'react';
import MainScreen from './src/screens/MainScreen';

const log = console.log;
console.error = val => {
  var out = val;
  //log(val);
};

export default App => <MainScreen />