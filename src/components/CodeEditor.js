import React from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import SyntaxHighlighter from '../react-native-syntax-highlighter/src/index';
import { docco } from '../react-syntax-highlighter/src/styles';

const styles = StyleSheet.create({
  keywordStyle: {
    color: '#769aa5'
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
    /([0-9]+|try|catch|return|console|function|var|let|const|if|".*?"|'.*?'|`.*?`)/g
  );

  const styleWrappedTexts = words.map((word, i) => {
    if (!word) {
      return null;
    }

    if (
      ['console', 'function', 'var', 'let', 'const', 'if', 'NaN'].indexOf(
        word
      ) >= 0
    ) {
      partStyle = styles.keywordStyle;
    } else if (!isNaN(parseInt(word))) {
      partStyle = styles.numberStyle;
    } else if (
      (word.startsWith('"') && word.endsWith('"')) ||
      (word.startsWith("'") && word.endsWith("'")) ||
      (word.startsWith('`') && word.endsWith('`'))
    ) {
      partStyle = styles.stringStyle;
    } else if (['return', 'try', 'catch'].indexOf(word) >= 0) {
      partStyle = styles.returnStyle;
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
