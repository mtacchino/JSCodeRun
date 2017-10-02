import React, { Component } from 'react';
import MainScreen from './src/screens/MainScreen';
import fibonacci from './src/constants/code/fibonacci';

const log = console.log;
output = [];
console.error = val => {
  var out = val;
  //log(arguments);
};

export default App => <MainScreen code={fibonacci}/>