import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View, Modal, Button, Platform, Alert } from 'react-native';
import fs from 'react-native-fs';
import ModalHeader from '../components/ModalHeader';

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    backgroundColor: '#444',
    flex: 1
  },
  viewContentContainer: {
    alignItems: 'center'
  },
  textInput: {
    borderBottomColor: 'green',
    borderBottomWidth: 2,
    color: 'white',
    flex: 1,
    height: 40
  }
});

const documentsDir = `${Platform.OS === 'ios' ? fs.MainBundlePath : fs.DocumentDirectoryPath}/my-files`;

export default class FileSaveModal extends Component {
  state = { fileName: '' };

  saveFile = fileContents => {
    const path = `${documentsDir}/${this.state.fileName}.js`;

    fs
      .writeFile(path, fileContents, 'utf8')
      .then(success => {
        Alert.alert(`${this.state.fileName} successfully saved`, null, [
          {
            text: 'OK',
            onPress: () => this.props.onClose()
          }
        ]);
      })
      .catch(err => {
        Alert.alert(`There was a problem saving file: ${this.state.fileName}`, `${err.code}: ${err.message}`);
      });
  };

  render() {
    const { fileContents, onClose, saveFileSubmit } = this.props;
    return (
      <Modal animationType="slide" transparent={false} hardwareAccelerated onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <ModalHeader onClose={onClose} title="SAVE AS" />
          <View style={{ margin: 30, flexDirection: 'row' }}>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={fileName => this.setState({ fileName })}
              value={this.state.fileName}
            />
            <Text>.js</Text>
          </View>
          <Button
            onPress={() => this.saveFile(fileContents)}
            title="Save"
            color="white"
            accessibilityLabel="Save file"
          />
        </View>
      </Modal>
    );
  }
}
