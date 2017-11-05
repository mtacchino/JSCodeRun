import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, Platform, Keyboard } from 'react-native';
import fs from 'react-native-fs';

import { fileSaveSubmit } from '../reducers/fileSystem';
import { ScreenNames } from './Navigator';

const styles = StyleSheet.create({
  container: {
    height: 55,
    width: '100%',
    marginTop: Platform.OS === 'ios' ? 20 : 0
  },
  headerBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10
  },
  saveButton: {
    height: 25,
    width: 25,
    tintColor: 'white'
  },
  runButton: {
    height: 35,
    width: 35,
    tintColor: 'white'
  },
  hamburger: {
    height: 35,
    width: 35,
    tintColor: 'white'
  },
  hamburgerContainer: {
    flex: 1
  },
  saveContainer: {
    padding: 5
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
    flexGrow: 1
  },
  toolBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
  }
});

export class HeaderBar extends React.Component {
  onQuickSave = () => {
    if (!this.props.currentFile) {
      this.props.navigation.navigate(ScreenNames.FILE_SAVE_AS_SCREEN);
      return;
    }
    this.props.saveFile(this.props.currentFile, this.props.code);
  };

  openDrawer = () => {
    Keyboard.dismiss();
    this.props.navigation.navigate('DrawerOpen');
  };

  render() {
    const { runCode, currentFile } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.hamburgerContainer} onPress={this.openDrawer}>
            <Image style={styles.hamburger} source={require('../../assets/hamburger.png')} />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {currentFile || 'JS Code Run'}
            {currentFile && this.props.isEdited && '*'}
          </Text>
          <View style={styles.toolBar}>
            <TouchableOpacity style={styles.saveContainer} onPress={() => this.onQuickSave()}>
              <Image style={styles.saveButton} source={require('../../assets/save-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => runCode()}>
              <Image style={styles.runButton} source={require('../../assets/run.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    currentFile: state.fileSystem.currentFile,
    isEdited: state.fileSystem.isEdited
  }),
  dispatch => ({
    saveFile: (fileName, fileContents) => dispatch(fileSaveSubmit(fileName, fileContents))
  })
)(HeaderBar);
