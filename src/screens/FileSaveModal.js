import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Modal,
  Button,
  Platform,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';
import fs from 'react-native-fs';
import ModalHeader from '../components/ModalHeader';
import { fileSaveSubmit } from '../reducers/fileSystem';

const styles = StyleSheet.create({
  modalContainer: {
    height: '100%',
    backgroundColor: '#444',
    flex: 1,
    alignItems: 'center'
  },
  containerView: {
    margin: 30,
    flexDirection: 'row'
  },
  textInput: {
    borderBottomColor: 'white',
    borderBottomWidth: 4,
    color: 'white',
    flex: 1,
    fontSize: 30,
    color: '#71d5c3'
  },
  fileExtention: {
    fontSize: 30,
    color: '#71d5c3',
    alignSelf: 'flex-end'
  },
  saveIcon: {
    tintColor: 'white',
    width: 70,
    height: 70,
    marginVertical: 30
  },
  saveButton: {
    backgroundColor: '#71d5c3',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  disabledSaveButton: {
    backgroundColor: '#888'
  },
  saveButtonText: {
    fontSize: 30,
    color: 'white'
  }
});

const documentsDir = `${Platform.OS === 'ios' ? fs.MainBundlePath : fs.DocumentDirectoryPath}/my-files`;

class FileSaveModal extends Component {
  state = { fileName: '' };

  saveFile = () => {
    this.props.saveFile(`${this.state.fileName}.js`, this.props.fileContents, () => {
      Alert.alert(`${this.state.fileName}.js saved successfully`, null, [
        {
          text: 'OK',
          onPress: () => this.props.onClose()
        }
      ]);
    });
  };

  isSaveEnabled = () => this.state.fileName.length > 0;

  render() {
    const { fileContents, onClose, err } = this.props;

    return (
      <Modal animationType="slide" transparent={false} hardwareAccelerated onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <ModalHeader onClose={onClose} title="SAVE AS" />
          <Image source={require('../../assets/save-icon.png')} style={styles.saveIcon} />
          <View style={styles.containerView}>
            <TextInput
              maxLength={100}
              style={styles.textInput}
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              autoCorrect={false}
              onChangeText={fileName => this.setState({ fileName })}
              value={this.state.fileName}
            />
            <Text style={styles.fileExtention}>.js</Text>
          </View>
          <TouchableOpacity
            disabled={!this.isSaveEnabled()}
            style={StyleSheet.flatten([styles.saveButton, this.isSaveEnabled() ? {} : styles.disabledSaveButton])}
            onPress={() => this.saveFile()}
            accessibilityLabel="Save file"
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default connect(null, dispatch => ({
  saveFile: (fileName, fileContents, onClose) => dispatch(fileSaveSubmit(fileName, fileContents, onClose))
}))(FileSaveModal);
