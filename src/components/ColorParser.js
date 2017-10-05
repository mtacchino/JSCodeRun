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
  commentStyle: {
    color: '#888'
  },
  defaultStyle: {
    color: '#eee'
  }
});
export default ColorParser = ({ text }) => {
    const numbers = '[0-9]+';
    const reserved = reservedWords.allWords.map(w => `\\b${w}\\b`).join('|');
    const comments = '//.*\n';
    const quotes = `".*?"|'.*?'|\`.*?\``;
    const brackets = '\\.|\\,|\\(|\\)|\\{|\\}|\\[|\\]';
    const comparators = '\\=|\\<|\\>';
    const regex = new RegExp(`(${comments}|${brackets}|${comparators}|${numbers}|${reserved}|${quotes})`, 'g');
    const words = text.split(regex);
    const styleWrappedTexts = words.map((word, i) => {
      if (word === undefined) {
        return null;
      }
  
      if (reservedWords.basicWords.indexOf(word.trim()) >= 0) {
        partStyle = styles.basicKeywordStyle;
      } else if (reservedWords.funcWords.indexOf(word.trim()) >= 0) {
        partStyle = styles.funcKeywordStyle;
      } else if (reservedWords.advancedWords.indexOf(word.trim()) >= 0) {
        partStyle = styles.advancedKeywordStyle;
      } else if (!isNaN(parseInt(word))) {
        partStyle = styles.numberStyle;
      } else if (
        (word.startsWith('"') && word.endsWith('"')) ||
        (word.startsWith("'") && word.endsWith("'")) ||
        (word.startsWith('`') && word.endsWith('`'))
      ) {
        partStyle = styles.stringStyle;
      } else if (new RegExp(brackets).test(word)) {
        partStyle = styles.basicKeywordStyle;
      } else if (new RegExp(comparators).test(word)) {
        partStyle = styles.advancedKeywordStyle;
      } else if (new RegExp(comments).test(word)) {
        partStyle = styles.commentStyle;
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