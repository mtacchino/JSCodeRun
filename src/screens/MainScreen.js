import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native';
import CodeEditor from '../components/CodeEditor';
import Output from '../components/Output';
import HeaderBar from '../components/HeaderBar';
import defaultCode from '../constants/code/hello-world';

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#777'
  },
  screenContainer: {
    flex: 1
  },
  editorWrapper: {
    flex: 2,
    alignSelf: 'stretch'
  },
  outputWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff'
  }
});
  

export default class MainScreen extends Component {
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

  onClearOutput = () => {
    this.setState({
      output: []
    });
  }

  runCode = () => {
    Keyboard.dismiss();
    const output = [];
    const consoleTemp = Object.assign({}, console);

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

    console = consoleTemp;
    this.setState({
      output
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
            barStyle="light-content"
            animated
            translucent
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.screenContainer}>
            <HeaderBar runCode={this.runCode} generateCode={(code) => this.setState({code})}/>
            <KeyboardAvoidingView behavior="height" style={styles.editorWrapper}>
              <CodeEditor
                code={this.state.code}
                handleCodeChange={this.handleCodeChange}
              />
            </KeyboardAvoidingView>
            <View style={styles.outputWrapper}>
              <Output
                output={this.state.output}
                onClearOutput={this.onClearOutput} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}