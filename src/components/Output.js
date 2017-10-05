import React from 'react';
import { Text, ScrollView, View, StyleSheet, Image, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'row'
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
    <ScrollView style={{flex:1}}>
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
    <View style={{flex:1}}>
      <TouchableHighlight onPress={() => onClearOutput()}>
        <Image 
            style={{width: 20, height: 20, alignSelf:'flex-end'}}
            source={require('../../assets/delete.png')}
        />
      </TouchableHighlight>
    </View>
  </View>

export default Output;
