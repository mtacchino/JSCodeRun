import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CodeEditor from './src/components/CodeEditor';
import Output from './src/components/Output';

const defaultCode = `
function fib(n) {
  if (n === 0 || n === 1) {
    return n;
  }

  return fib(n-1) + fib(n-2);
}
const result = fib(4);

console.log('The result is...');
console.log(result);
`;

const log = console.log;
output = [];
console.error = val => {
  var out = val;
  //log(arguments);
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: defaultCode,
      output: []
    };
  }

  handleCodeChange = code => {
    this.setState({
      code
    });
  };

  runCode = () => {
    const output = [];
    console.log = message => {
      output.push({
        message,
        status: 'OK'
      });
      //log(arguments);
    };
    console.error = message => {
      output.push({
        message,
        status: 'ERROR'
      });
    };
    try {
      new Function(this.state.code)();
    } catch (err) {
      output.push({
        message: err.toString(),
        status: 'ERROR'
      });
    }

    this.setState({
      output
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 70,
            width: '100%',
            paddingTop: 20,
            backgroundColor: 'white'
          }}
        >
          <TouchableOpacity onPress={() => this.runCode()}>
            <Text>Run</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch'
          }}
        >
          <CodeEditor
            code={this.state.code}
            handleCodeChange={this.handleCodeChange}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Output output={this.state.output} status={this.state.status} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});
