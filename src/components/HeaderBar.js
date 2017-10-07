
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
        height: 80,
        width: '100%',
        backgroundColor: '#ddd'
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
        marginTop: 20
    },
    modalClose: {
        borderBottomWidth: 1,
        borderColor:'#d6d7da'
    },
    listItemSmallText: {
        marginLeft: 10,
        opacity: 0.7
    },
    runButton: {
        height: 40,
        width: 40
    }
});

const ListItem = ({item, onPress}) =>
    <TouchableHighlight style={styles.listItem}
        activeOpacity={0.2}
        underlayColor="#eee"
        onPress={() => onPress(item.code)}>
        <View>
            <Text>{item.key}</Text>
            <Text style={styles.listItemSmallText}>Runtime:{item.runtimeComplexity}, Space:{item.spaceComplexity}</Text>
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
    return <View style={styles.container}>
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isExamplesModalDisplayed}
            onRequestClose={() => {this.toggleExamplesModal()}}
        >
            <View style={styles.modalContainer}>
                
                <Button style={styles.modalClose} onPress={() => this.toggleExamplesModal()} title="Close ✖" />
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
            <TouchableOpacity style={styles.headerBarItem} onPress={() => {this.toggleExamplesModal()}}>
                <Text>Code examples</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerBarItem} onPress={() => {this.props.runCode()}}>
                <Image style={styles.runButton} source={require('../../assets/run.png')} />
            </TouchableOpacity>

        </View>
    </View>
  }
}