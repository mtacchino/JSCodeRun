import React from 'react';
import { Text } from 'react-native';
import * as reservedWords from '../constants/reservedWords';

export default ColorParser = ({ text }) => {
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