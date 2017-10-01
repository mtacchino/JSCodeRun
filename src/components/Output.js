import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
    height: '100%',
    backgroundColor: '#ddd'
  }
});

const successStyle = StyleSheet.create({
  text: {
    color: 'black'
  }
});

const errorStyle = StyleSheet.create({
  text: {
    color: 'red'
  }
});

const Output = ({ output, status }) => {
  if (!output.length) {
    return <View style={styles.container}></View>;
  }
  return (
    <View style={styles.container}>
      {output.map((line, i) => {
        const styles = line.status === 'ERROR' ? errorStyle : successStyle;
        return (
          <View key={i} style={styles.lineWrapper}>
            <Text style={styles.text}>
              {line.message}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default Output;
