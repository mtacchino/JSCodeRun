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
  TouchableHighlight,
  TouchableOpacity,
  Image
} from 'react-native';
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
    paddingVertical: 15,
    backgroundColor: '#555555'
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listItemText: {
    color: '#71d5c3',
    fontSize: 20
  },
  listItemTextContainer: {
    paddingLeft: 25,
    flex: 1
  },
  listItemSubtext: {
    marginLeft: 10,
    color: 'white',
    fontSize: 15
  },
  italic: {
    fontStyle: 'italic'
  },
  paragraph: {
    marginVertical: 10
  },
  paragraphText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  deleteButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    flexShrink: 1
  },
  deleteButtonImage: {
    tintColor: '#a00e03',
    width: 25,
    height: 25
  }
});

const ListItem = ({ item, onPress, onDelete }) => (
  <TouchableHighlight
    style={styles.listItem}
    activeOpacity={1}
    underlayColor="#777777"
    onPress={() => onPress(item.name)}
  >
    <View style={styles.listItemContainer}>
      <View style={styles.listItemTextContainer}>
        <Text style={styles.listItemText}>{item.name}</Text>
        <Text style={StyleSheet.flatten([styles.listItemSubtext, styles.italic])}>
          Modified: {item.modifiedDate.toUTCString()}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(item.name)} style={styles.deleteButton}>
        <Image style={styles.deleteButtonImage} source={require('../../assets/delete.png')} />
      </TouchableOpacity>
    </View>
  </TouchableHighlight>
);

const Separator = () => <View style={styles.separator} />;
const ListWrap = () => <View style={styles.listWrap} />;

const documentsDir = `${Platform.OS === 'ios' ? fs.MainBundlePath : fs.DocumentDirectoryPath}/my-files`;

export default class FileSaveModal extends Component {
  state = { loading: true, files: [] };

  componentDidMount() {
    this.readDir();
  }

  readDir = () =>
    fs
      .mkdir(documentsDir)
      .then(() => fs.readDir(documentsDir))
      .then(files => {
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

  openFile = fileName => {
    const path = `${documentsDir}/${fileName}`;

    fs
      .readFile(path)
      .then(contents => {
        this.props.generateCode(contents);
        this.props.onClose();
      })
      .catch(err => {
        Alert.alert(err.code, err.message);
      });
  };

  displayDeleteFileAlert = fileName => {
    Alert.alert(`Are you sure you want to delete ${fileName}?`, null, [
      ,
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => this.deleteFile(fileName)
      }
    ]);
  };

  deleteFile = fileName => {
    const path = `${documentsDir}/${fileName}`;

    fs
      .unlink(path)
      .then(this.readDir)
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
          {!this.state.files.length ? (
            <View style={styles.paragraph}>
              <Text style={styles.paragraphText}>You don't have any saved files.</Text>
            </View>
          ) : null}
          <FlatList
            data={this.state.files}
            ItemSeparatorComponent={() => <Separator />}
            ListHeaderComponent={() => <ListWrap />}
            ListFooterComponent={() => <ListWrap />}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
              <ListItem item={item} onPress={this.openFile} onDelete={this.displayDeleteFileAlert} />
            )}
          />
        </View>
      </Modal>
    );
  }
}
