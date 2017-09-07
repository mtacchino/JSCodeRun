import React from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import SyntaxHighlighter from '../react-native-syntax-highlighter/src/index';
import { docco } from '../react-syntax-highlighter/src/styles';

const styles = StyleSheet.create({
  keywordStyle: {
    color: 'blue'
  },
  defaultStyle: {
    color: '#ddd'
  }
});

const Wrapper = ({ text }) => {
  const words = text.split(/(console|var|let|const)/g);

  var a = words.map(word => {
    switch (word) {
      case 'console':
      case 'var':
      case 'let':
      case 'const':
        return <Text style={styles.keywordStyle}>{word}</Text>;
      case '':
        return null;
      default:
        return <Text style={styles.defaultStyle}>{word}</Text>;
    }
  });
  console.warn(a);
  return <Text>{a}</Text>;
};

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: 'console.log("hi")\nvar a =5;'
    };
  }
  handleChange = code => {
    this.setState({
      code
    });
  };

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
        onChangeText={this.handleChange}
      >
        <Wrapper text={this.state.code} />
      </TextInput>
    );
  }
}
export default CodeEditor;
