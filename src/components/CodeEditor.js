import React, { Component } from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import ColorParser from './ColorParser';
import * as reservedWords from '../constants/reservedWords';

const styles = StyleSheet.create({
  basicKeywordStyle: {
    color: '#769aa5'
  },
  funcKeywordStyle: {
    color: '#9876aa'
  },
  advancedKeywordStyle: {
    color: '#71d5c3'
  },
  stringStyle: {
    color: '#cc7832'
  },
  numberStyle: {
    color: '#a5c25c'
  },
  defaultStyle: {
    color: '#eee'
  },
  textInput: {
    height: '100%',
    backgroundColor: '#222',
    color: 'white',
    padding: 5
  }
});

class CodeEditor extends Component {
  render() {
    return (
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        autoCorrect={false}
        multiline
        onChangeText={this.props.handleCodeChange}
      >
        <ColorParser text={this.props.code} />
      </TextInput>
    );
  }
}
export default CodeEditor;
