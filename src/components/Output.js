import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 2,
    backgroundColor: '#333'
  }
});

const successStyle = StyleSheet.create({
  lineWrapper: {
    backgroundColor: 'blue'
  },
  text: {
    color: 'black'
  }
});

const errorStyle = StyleSheet.create({
  container: {
    padding: '10px'
  },
  lineWrapper: {
    backgroundColor: 'red'
  },
  text: {
    color: 'white'
  }
});

const Output = ({ output, status }) => {
  if (!output.length) {
    return null;
  }
  return (
    <View style={styles.container}>
      {output.map((line, i) => {
        const styles = line.status === 'ERROR' ? errorStyle : successStyle;
        return (
          <View style={styles.lineWrapper}>
            <Text key={i} style={styles.text}>
              {line.message}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default Output;
