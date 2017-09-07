import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

const successStyle = StyleSheet.create({
  container: {
    backgroundColor: 'blue'
  },
  text: {
    color: 'black'
  }
});

const errorStyle = StyleSheet.create({
  container: {
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
    <View>
      {output.map((line, i) => {
        const styles = line.status === 'ERROR' ? errorStyle : successStyle;
        return (
          <View style={styles.container}>
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
