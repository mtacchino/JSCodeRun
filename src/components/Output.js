import React from 'react';
import { Text, ScrollView, View, StyleSheet, Image, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'row'
  },
  output: {
    flex: 15
  },
  trashContainer: {
    flex: 1
  },
  trashImage: {
    width: 20,
    height: 20,
    alignSelf:'flex-end'
  }
});

const successStyle = StyleSheet.create({
  text: {
    color: 'black'
  }
});

const errorStyle = StyleSheet.create({
  text: {
    color: 'darkred'
  }
});

const Output = ({ output, status, onClearOutput }) =>
  <View style={styles.container}>
    <View style={styles.output}>
      <ScrollView >
        {output.length ? output.map((line, i) => {
          const styles = line.status === 'ERROR' ? errorStyle : successStyle;
          return (
            <View key={i} style={styles.lineWrapper}>
              <Text style={styles.text}>
                {line.message}
              </Text>
            </View>
          );
        }) : null}
      </ScrollView>
    </View>
    <View style={styles.trashContainer}>
      <TouchableHighlight onPress={() => onClearOutput()}>
        <Image 
          style={styles.trashImage}
          source={require('../../assets/delete.png')}
        />
      </TouchableHighlight>
    </View>
  </View>

export default Output;
