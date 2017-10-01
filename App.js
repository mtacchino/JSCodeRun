import React, { Component } from 'react';
import MainScreen from './src/screens/MainScreen';

const log = console.log;
output = [];
console.error = val => {
  var out = val;
  //log(arguments);
};

const defaultCode =
`function fib(n) {
  if (n === 0 || n === 1) {
    return n;
  }

  return fib(n-1) + fib(n-2);
}
const result = fib(4);

console.log('The result is...');
console.log(result);
`;

export default App => <MainScreen code={defaultCode}/>