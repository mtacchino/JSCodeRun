
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    Modal,
    Image,
    Linking
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import ModalHeader from '../components/ModalHeader';

const styles = StyleSheet.create({
    modalContainer: {
        height: '100%',
        backgroundColor: '#444'
    },
    viewContainer: {
        flex: 1,
        padding: 30
    },
    viewContentContainer: {
        alignItems: 'center'
    },
    paragraph: {
        marginVertical: 10
    },
    paragraphText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    legalText: {
        color: '#9876aa',
        fontSize: 14,
        textAlign: 'center'
    },
    link: {
        color: '#71d5c3'
    },
    logoImage: {
        width: 250,
        height: 250,
        marginBottom: 40
    }
});

const currentYear = new Date().getFullYear();
const appVersion = DeviceInfo.getVersion();

export default AboutModal = props =>
    <Modal
        animationType="slide"
        transparent={false}
        hardwareAccelerated
        onRequestClose={props.onClose}
    >
        <View style={styles.modalContainer}>
            <ModalHeader onClose={props.onClose} title="ABOUT" />
            <ScrollView contentContainerStyle={styles.viewContentContainer} style={styles.viewContainer}>
                <View style={styles.paragraph}>
                    <Text style={styles.paragraphText}>JS Code Run helps you write and run JavaScript code snippets.</Text>
                </View>
                <View style={styles.paragraph}>
                    <Text style={styles.paragraphText}>Need ideas to get started? Check out the examples in the menu.</Text>
                </View>
                <View style={styles.paragraph}>
                    <Text style={styles.paragraphText}>
                        JS Code Run is open source under the MIT license. If you want to add a feature or contribute, fork us on&nbsp;
                        <Text style={styles.link}
                            onPress={() => Linking.openURL('http://github.com/mtacchino/JSCodeRun')}>
                            Github
                        </Text>.
                    </Text>
                </View>
                <View style={styles.paragraph}>
                    {appVersion && <Text style={styles.legalText}>Version {appVersion}</Text>}
                </View>
                <View style={styles.paragraph}>
                    <Text style={styles.legalText}>Copyright © Matt Tacchino {currentYear}</Text>
                </View>
                <Image style={styles.logoImage} source={require('../../assets/splash.png')} />
            </ScrollView>
        </View>
    </Modal>