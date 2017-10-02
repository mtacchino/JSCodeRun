import React from 'react';
import { Text, StyleSheet } from 'react-native';
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
  }
});
export default ColorParser = ({ text }) => {
    const wrds = reservedWords.allWords.map(w => '(?:^|[^A-Za-z0-9_])'+w+'(?![A-Za-z0-9_-])');
    const words = text.split(
      new RegExp(`([0-9]+|${wrds.join('|')}|".*?"|'.*?'|\`.*?\`)`, 'g')
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