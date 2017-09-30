import React from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import * as reservedWords from '../constants/reservedWords';

const styles = StyleSheet.create({
  basicKeywordStyle: {
    color: '#769aa5'
  },
  funcKeywordStyle: {
    color: '#ecf13a'
  },
  advancedKeywordStyle: {
    color: '#a1edd5'
  },
  stringStyle: {
    color: '#cc7832'
  },
  numberStyle: {
    color: '#a5c25c'
  },
  returnStyle: {
    color: '#9876aa'
  },
  defaultStyle: {
    color: '#eee'
  }
});

const Wrapper = ({ text }) => {
  const words = text.split(
    new RegExp(`([0-9]+|${reservedWords.allWords.join('|')}|".*?"|'.*?'|\`.*?\`)`, 'g')
  );

  const styleWrappedTexts = words.map((word, i) => {
    if (!word) {
      return null;
    }

    if (reservedWords.basicWords.indexOf(word) >= 0) {
      partStyle = styles.basicKeywordStyle;
    } else if (reservedWords.funcWords.indexOf(word) >= 0) {
      partStyle = styles.funcKeywordStyle;
    } else if (reservedWords.advancedWords.indexOf(word) >= 0) {
      partStyle = styles.advancedKeywordStyle;
    } else if (!isNaN(parseInt(word))) {
      partStyle = styles.numberStyle;
    } else if (
      (word.startsWith('"') && word.endsWith('"')) ||
      (word.startsWith("'") && word.endsWith("'")) ||
      (word.startsWith('`') && word.endsWith('`'))
    ) {
      partStyle = styles.stringStyle;
    } else {
      partStyle = styles.defaultStyle;
    }
    return (
      <Text key={i} style={partStyle}>
        {word}
      </Text>
    );
  });
  return <Text>{styleWrappedTexts}</Text>;
};

class CodeEditor extends React.Component {
  render() {
    return (
      <TextInput
        style={{
          height: '100%',
          backgroundColor: '#222',
          color: 'white'
        }}
        autoCapitalize="none"
        autoCorrect={false}
        multiline
        onChangeText={this.props.handleCodeChange}
      >
        <Wrapper text={this.props.code} />
      </TextInput>
    );
  }
}
export default CodeEditor;
