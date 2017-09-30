import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import CodeEditor from '../components/CodeEditor';
import Output from '../components/Output';
import Header from '../components/Header';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    }
  });
  

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: props.code,
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
        <Header runCode={this.runCode} generateCode={(code) => this.setState({code})}/>
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