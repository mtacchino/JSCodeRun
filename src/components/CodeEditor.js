import React, { Component } from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import SyntaxHighlighter from './SyntaxHighlighter';

const styles = StyleSheet.create({
  textInput: {
    height: '100%',
    backgroundColor: '#222',
    color: 'white',
    padding: 5,
    textAlignVertical: 'top',
    fontSize: 14
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
        keyboardType="ascii-capable"
        blurOnSubmit={false}
        underlineColorAndroid="transparent"
        onChangeText={this.props.handleCodeChange}
      >
        <SyntaxHighlighter text={this.props.code} />
      </TextInput>
    );
  }
}
export default CodeEditor;
