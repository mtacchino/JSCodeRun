import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from 'react-native';
import CodeEditor from '../components/CodeEditor';
import Output from '../components/Output';
import HeaderBar from '../components/HeaderBar';
import defaultCode from '../constants/code/hello-world';
import { transform } from '../../assets/babel-6.26.0';
import '../../assets/babel-polyfill';

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
    backgroundColor: '#fff'
  }
});
  

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: defaultCode,
      output: [],
      outputHeight: 200
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
  
  componentWillMount() {
    let keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', event => {
      this.setState({
        outputHeight: event.endCoordinates.height
      });
      keyboardDidShowListener.remove();
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.screenContainer}>
          <View style={styles.editorWrapper}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <HeaderBar
                  navigation={this.props.navigation}
                  runCode={this.runCode} 
                  generateCode={(code) => this.setState({code})}
                />
                <KeyboardAvoidingView behavior="height" >
                  <CodeEditor
                    code={this.state.code}
                    handleCodeChange={this.handleCodeChange}
                  />
                </KeyboardAvoidingView>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={[
              styles.outputWrapper,
              {
                height:this.state.outputHeight
              }
            ]}
          >
            <Output
              output={this.state.output}
              onClearOutput={this.onClearOutput} />
          </View>
        </View>
      </View>
    );
  }
}