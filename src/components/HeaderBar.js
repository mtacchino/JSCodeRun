
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
    container: {
        marginTop: 22, // Status bar height
        height: 55,
        width: '100%'
    },
    headerBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginHorizontal: 5
    },
    headerBarItem: {
        padding: 5
    },
    listItem: {
        paddingHorizontal: 15,
        paddingVertical: 7
    },
    separator: {
        height: 1,
        width: "94%",
        backgroundColor: "#CED0CE",
        marginLeft: "3%"
    },
    modalContainer: {
        paddingTop: 22, //Status bar height
        height:'100%',
        backgroundColor: '#444'
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalTitle: {
        fontSize: 24,
        padding: 10,
        color: 'white'
    },
    modalCloseText: {
        fontSize: 30,
        color: 'black',
        padding: 5
    },
    listItemText: {
        color: 'white'
    },
    listItemSubtext: {
        marginLeft: 10,
        opacity: 0.7,
        color: 'white'
    },
    examplesButton: {
        paddingBottom: 5
    },
    runButton: {
        height: 40,
        width: 40
    }
});

const ListItem = ({item, onPress}) =>
    <TouchableHighlight style={styles.listItem}
        activeOpacity={0.2}
        underlayColor="#444"
        onPress={() => onPress(item.code)}>
        <View>
            <Text style={styles.listItemText}>{item.key}</Text>
            <Text style={styles.listItemSubtext}>Runtime:{item.runtimeComplexity}, Space:{item.spaceComplexity}</Text>
        </View>
    </TouchableHighlight>

const Separator = () => <View style={styles.separator}/>

export default class HeaderBar extends Component {
  constructor(props) {
      super(props);
      this.state = {
          isExamplesModalDisplayed: false
      };
  }

  toggleExamplesModal = () => {
    this.setState({
        isExamplesModalDisplayed: !this.state.isExamplesModalDisplayed
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
            animationType="slide"
            transparent={false}
            hardwareAccelerated
            visible={this.state.isExamplesModalDisplayed}
            onRequestClose={() => {this.toggleExamplesModal()}}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>Code examples</Text>
                    <TouchableOpacity onPress={() => this.toggleExamplesModal()}>
                        <Text style={styles.modalCloseText}>✕</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={codeExamples}
                    ItemSeparatorComponent={() => <Separator />}
                    ListHeaderComponent={() => <Separator />}
                    ListFooterComponent={() => <Separator />}
                    keyExtractor={item => item.key}
                    renderItem={({item}) => <ListItem item={item} onPress={code => {this.props.generateCode(code); this.toggleExamplesModal()}}/>}
                />
            </View>
        </Modal>
        <View style={styles.headerBar}>
            <View style={styles.examplesButton}>
            <TouchableOpacity onPress={() => this.toggleExamplesModal()}>
                <Text style={{fontSize: 20, padding: 8, color: '#fff'}}>Code Examples</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.headerBarItem} onPress={() => {this.props.runCode()}}>
                <Image style={styles.runButton} source={require('../../assets/run.png')} />
            </TouchableOpacity>

        </View>
      </View>
    );
  }
}