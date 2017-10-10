
import React from 'react';
import { 
    StyleSheet, 
    Text,
    View,
    TouchableOpacity
} from 'react-native';

const styles = StyleSheet.create({
    modalHeader: {
        flexDirection: 'row'
    },
    modalTitle: {
        fontSize: 24,
        color: 'white',
    },
    modalCloseText: {
        fontSize: 30,
        color: 'white'
    }
});

export default ModalHeader = props =>
    <View style={styles.modalHeader}>
        <View style={{flex:1}}></View>
        <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
            <Text style={styles.modalTitle}>{props.title}</Text>
        </View>
        <TouchableOpacity style={{flex:1,alignItems:'flex-end', justifyContent: 'center'}} onPress={props.onClose}>
            <Text style={styles.modalCloseText}>✕</Text>
        </TouchableOpacity>
    </View>