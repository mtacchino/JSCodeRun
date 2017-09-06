import React from 'react';
import { Text } from 'react-native';

const out = '';
const log = console.log;
console.log = val => {
  out = val;
  //log(arguments);
};

const Output = ({ code }) => {
  try {
    const output = new Function(code);
    output();
  } catch(e) {
      out = e.toString();
  }
  console.log(out)
  return <Text>{out}</Text>;
};

export default Output;