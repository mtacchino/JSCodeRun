
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
import codeExamples from '../constants/examples.js';

const styles = StyleSheet.create({
    separator: {
        height: 1,
        width: "94%",
        backgroundColor: "#666",
        marginLeft: "3%"
    },
    modalContainer: {
        paddingTop: 22, //Status bar height
        height:'100%',
        backgroundColor: '#444'
    },
    listItem: {
        paddingHorizontal: 15,
        paddingVertical: 12
    },
    listItemText: {
        color: 'white'
    },
    listItemSubtext: {
        marginLeft: 10,
        opacity: 0.7,
        color: 'white'
    }
});

const ListItem = ({item, onPress}) =>
    <TouchableHighlight 
        style={styles.listItem}
        activeOpacity={0.2}
        underlayColor="#444"
        onPress={() => onPress(item.code)}
    >
        <View>
            <Text style={styles.listItemText}>{item.key}</Text>
            <Text style={styles.listItemSubtext}>Runtime:{item.runtimeComplexity}, Space:{item.spaceComplexity}</Text>
        </View>
    </TouchableHighlight>

const Separator = () => <View style={styles.separator}/>

export default ExamplesModal = props =>
    <Modal
        animationType="slide"
        transparent={false}
        hardwareAccelerated
        onRequestClose={props.onClose}
    >
        <View style={styles.modalContainer}>
            <ModalHeader onClose={props.onClose} title="Examples" />
            <FlatList
                data={codeExamples}
                ItemSeparatorComponent={() => <Separator />}
                ListHeaderComponent={() => <Separator />}
                ListFooterComponent={() => <Separator />}
                keyExtractor={item => item.key}
                renderItem={({item}) => <ListItem item={item} onPress={code => {props.generateCode(code); props.onClose()}}/>}
            />
        </View>
    </Modal>