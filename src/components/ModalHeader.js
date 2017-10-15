
import React from 'react';
import { 
    StyleSheet, 
    Text,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';
import fonts from '../themes/fonts';

const styles = StyleSheet.create({
    modalHeader: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingTop: Platform.OS === 'ios' ? 22 : 2,
        paddingBottom: 10,
        backgroundColor: '#2b2b2b'
    },
    modalItem: {
        flex: 1,
        justifyContent: 'center'
    },
    modalTitle: {
        flex: 2,
        alignItems: 'center',
    },
    modalTitleText: {
        fontSize: 24,
        fontFamily: fonts.fontFamily,
        color: 'white',
    },
    modalClose: {
        flex: 1,
        alignItems: 'flex-end'
    },
    modalCloseText: {
        fontSize: 30,
        color: 'white'
    }
});

export default ModalHeader = props =>
    <View style={styles.modalHeader}>
        <View style={styles.modalItem}></View>
        <View style={[styles.modalItem, styles.modalTitle]}>
            <Text style={styles.modalTitleText}>{props.title}</Text>
        </View>
        <TouchableOpacity style={[styles.modalItem, styles.modalClose]} onPress={props.onClose}>
            <Text style={styles.modalCloseText}>✕</Text>
        </TouchableOpacity>
    </View>