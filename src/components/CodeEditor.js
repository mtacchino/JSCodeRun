import React from 'react';
import { TextInput } from 'react-native';

const CodeEditor = ({ code, handleCodeChange }) => (
  <TextInput
    style={{
      height: '100%',
      backgroundColor: 'blue'
    }}
    multiline={true}
    value={code}
    onChangeText={handleCodeChange}
  />
);

export default CodeEditor;