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
import { transform } from '../../assets/babel-6.26.0';

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
      const transpiledCode = transform(this.state.code, {
        presets: ['latest']
      }).code;
      new Function(transpiledCode)();
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
        <View style={styles.screenContainer}>
          <View style={styles.editorWrapper}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <HeaderBar runCode={this.runCode} generateCode={(code) => this.setState({code})}/>
                <KeyboardAvoidingView behavior="height" >
                  <CodeEditor
                    code={this.state.code}
                    handleCodeChange={this.handleCodeChange}
                  />
                </KeyboardAvoidingView>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.outputWrapper}>
            <Output
              output={this.state.output}
              onClearOutput={this.onClearOutput} />
          </View>
        </View>
      </View>
    );
  }
}