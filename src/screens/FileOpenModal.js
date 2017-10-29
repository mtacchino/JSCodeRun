import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Modal,
  Button,
  Platform,
  Alert,
  FlatList,
  TouchableHighlight
} from 'react-native';
import fs from 'react-native-fs';

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
  },
  separator: {
    height: 6
  },
  listWrap: {
    height: 15
  },
  modalContainer: {
    height: '100%',
    backgroundColor: '#444'
  },
  listItem: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: '#555555'
  },
  listItemText: {
    color: '#71d5c3',
    fontSize: 20
  },
  listItemSubtext: {
    marginLeft: 10,
    color: 'white',
    fontSize: 15
  },
  italic: {
    fontStyle: 'italic'
  }
});

const ListItem = ({ item, onPress }) => (
  <TouchableHighlight
    style={styles.listItem}
    activeOpacity={1}
    underlayColor="#777777"
    onPress={() => onPress(item.name)}
  >
    <View>
      <Text style={styles.listItemText}>{item.name}</Text>
      <Text style={[styles.listItemSubtext, styles.italic]}>Modified: {item.modifiedDate.toUTCString()}</Text>
    </View>
  </TouchableHighlight>
);

const Separator = () => <View style={styles.separator} />;
const ListWrap = () => <View style={styles.listWrap} />;

const documentsDir = `${Platform.OS === 'ios' ? fs.MainBundlePath : fs.DocumentDirectoryPath}/my-files`;

export default class FileSaveModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      files: []
    };
  }

  componentDidMount() {
    this.readDir();
  }

  readDir = () => {
    return fs
      .mkdir(documentsDir)
      .then(() => fs.readDir(documentsDir))
      .then(files => {
        console.log(files);
        this.setState({
          loading: false,
          files: files.map(file => ({
            modifiedDate: file.mtime,
            name: file.name
          }))
        });
      })
      .catch(err => {
        Alert.alert(err.code, err.message);
        this.setState({
          loading: false
        });
      });
  };

  openFile = fileName => {
    const path = `${documentsDir}/${fileName}`;

    fs
      .readFile(path)
      .then(contents => {
        console.log(contents);
        this.props.generateCode(contents);
        this.props.onClose();
      })
      .catch(err => {
        Alert.alert(err.code, err.message);
      });
  };

  render() {
    const { fileContents, onClose, generateCode } = this.props;
    return (
      <Modal animationType="slide" transparent={false} hardwareAccelerated onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <ModalHeader onClose={onClose} title="OPEN" />
          <FlatList
            data={this.state.files}
            ItemSeparatorComponent={() => <Separator />}
            ListHeaderComponent={() => <ListWrap />}
            ListFooterComponent={() => <ListWrap />}
            keyExtractor={item => item.name}
            renderItem={({ item }) => <ListItem item={item} onPress={this.openFile} />}
          />
        </View>
      </Modal>
    );
  }
}
