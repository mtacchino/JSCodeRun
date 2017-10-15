
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    Modal,
    Image,
    Linking
} from 'react-native';

import ModalHeader from '../components/ModalHeader';

const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
        backgroundColor: '#444'
    }
});

export default AboutModal = props =>
    <Modal
        animationType="slide"
        transparent={false}
        hardwareAccelerated
        onRequestClose={props.onClose}
    >
        <View style={styles.modalContainer}>
            <ModalHeader onClose={props.onClose} title="ABOUT" />
            <View style={{paddingHorizontal: 30, flex: 1, alignItems: 'center'}}>
                <Image style={{width: 250, height: 250}} source={require('../../assets/splash.png')} />
                <View>
                    <Text style={{fontSize:20, textAlign:'center', color: 'white'}}>JS Code Run is open source and welcome to contributions!</Text>
                </View>
                <View>
                    <Text style={{color: 'lightblue', fontSize:30}}
                        onPress={() => Linking.openURL('http://github.com/mtacchino/JSCodeRun')}>
                        Github
                    </Text>
                </View>
            </View>
        </View>
    </Modal>