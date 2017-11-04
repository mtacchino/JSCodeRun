import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  FlatList,
  Button,
  Image
} from 'react-native';
import ModalHeader from '../components/ModalHeader';
import codeExamples from '../constants/examples.js';

const styles = StyleSheet.create({
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
  }
});

const ListItem = ({ item, onPress }) => (
  <TouchableHighlight
    style={styles.listItem}
    activeOpacity={1}
    underlayColor="#777777"
    onPress={() => onPress(item.code)}
  >
    <View>
      <Text style={styles.listItemText}>{item.key}</Text>
      <Text style={styles.listItemSubtext}>
        Runtime:{item.runtimeComplexity}, Space:{item.spaceComplexity}
      </Text>
    </View>
  </TouchableHighlight>
);

const Separator = () => <View style={styles.separator} />;
const ListWrap = () => <View style={styles.listWrap} />;

export default props => (
  <Modal animationType="slide" transparent={false} hardwareAccelerated onRequestClose={props.onClose}>
    <View style={styles.modalContainer}>
      <ModalHeader onClose={props.onClose} title="EXAMPLES" />
      <FlatList
        data={codeExamples}
        ItemSeparatorComponent={() => <Separator />}
        ListHeaderComponent={() => <ListWrap />}
        ListFooterComponent={() => <ListWrap />}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <ListItem
            item={item}
            onPress={code => {
              props.generateCode(code);
              props.onClose();
            }}
          />
        )}
      />
    </View>
  </Modal>
);
