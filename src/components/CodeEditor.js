import React, { Component } from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import ColorParser from './ColorParser';

const styles = StyleSheet.create({
  textInput: {
    height: '100%',
    backgroundColor: '#222',
    color: 'white',
    padding: 5,
    textAlignVertical: 'top'
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
        <ColorParser text={this.props.code} />
      </TextInput>
    );
  }
}
export default CodeEditor;
