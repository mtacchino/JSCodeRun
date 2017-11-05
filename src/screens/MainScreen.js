import React, { Component } from 'react';
import { StyleSheet, View, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import CodeEditor from '../components/CodeEditor';
import Output from '../components/Output';
import HeaderBar from '../components/HeaderBar';
import defaultCode from '../constants/code/hello-world';
import { transform } from '../../assets/babel-6.26.0';
import '../../assets/babel-polyfill';

import ExamplesModal from '../screens/ExamplesModal';
import AboutModal from '../screens/AboutModal';
import FileSaveModal from '../screens/FileSaveModal';
import FileOpenModal from '../screens/FileOpenModal';
import { ScreenNames } from '../components/Navigator';
import { editCode, fileOpenSuccess } from '../reducers/fileSystem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export class MainScreen extends Component {
  state = {
    code: defaultCode,
    output: [],
    outputHeight: 200
  };

  handleCodeChange = code => {
    this.setState({
      code
    });
    this.props.editCode();
  };

  generateCode = (code, fileName) => {
    this.handleCodeChange(code);
    this.props.fileOpenSuccess(code, '');
    this.onClearOutput();
  };

  onClearOutput = () => {
    this.setState({
      output: []
    });
  };

  runCode = () => {
    Keyboard.dismiss();
    const output = [];
    const consoleTemp = { ...console };

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

  renderModal() {
    switch (this.props.navigation && this.props.navigation.state && this.props.navigation.state.routeName) {
      case ScreenNames.EXAMPLES_SCREEN:
        return <ExamplesModal onClose={this.hideModal} generateCode={this.generateCode} />;
      case ScreenNames.ABOUT_SCREEN:
        return <AboutModal onClose={this.hideModal} />;
      case ScreenNames.FILE_SAVE_AS_SCREEN:
        return <FileSaveModal onClose={this.hideModal} fileContents={this.state.code} />;
      case ScreenNames.FILE_OPEN_SCREEN:
        return <FileOpenModal onClose={this.hideModal} generateCode={this.generateCode} />;
      default:
        return null;
    }
  }
  hideModal = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.screenContainer}>
          <View style={styles.editorWrapper}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View>
                <HeaderBar navigation={this.props.navigation} runCode={this.runCode} code={this.state.code} />
                {this.renderModal()}
                <KeyboardAvoidingView behavior="height">
                  <CodeEditor code={this.state.code} handleCodeChange={this.handleCodeChange} />
                </KeyboardAvoidingView>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={[
              styles.outputWrapper,
              {
                height: this.state.outputHeight
              }
            ]}
          >
            <Output output={this.state.output} onClearOutput={this.onClearOutput} />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(null, dispatch => ({
  editCode: () => dispatch(editCode()),
  fileOpenSuccess: (contents, fileName) => dispatch(fileOpenSuccess(contents, fileName))
}))(MainScreen);
