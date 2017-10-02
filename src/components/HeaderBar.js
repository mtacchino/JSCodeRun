
import React, { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    TouchableOpacity, 
    TouchableHighlight, 
    Modal, 
    FlatList,
    Button
} from 'react-native';
import codeExamples from '../constants/examples.js';

const ListItem = ({item, onPress}) =>
    <TouchableHighlight style={{
        paddingHorizontal: 15,
        paddingVertical: 7
    }}
        activeOpacity={0.2}
        underlayColor="#eee"
        onPress={() => onPress(item.code)}>
        <View>
            <Text>{item.key}</Text>
            <Text style={{marginLeft: 10, opacity: 0.7}}>Runtime:{item.runtimeComplexity}, Space:{item.spaceComplexity}</Text>
        </View>
    </TouchableHighlight>

const Separator = () =>
    <View
        style={{
            height: 1,
            width: "94%",
            backgroundColor: "#CED0CE",
            marginLeft: "3%"
        }}
    />

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
    return <View
        style={{
            height: 50,
            width: '100%',
            paddingTop: 20,
            paddingHorizontal: 20,
            backgroundColor: '#ddd'
        }}
    >
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isExamplesModalDisplayed}
            onRequestClose={() => {this.toggleExamplesModal()}}
        >
            <View style={{marginTop: 20 }}>
                <Button style={{borderBottomWidth: 1, borderColor:'#d6d7da'}} onPress={() => this.toggleExamplesModal()} title="Done" />
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
        <View
            style={{
                flex: 1,
                flexDirection: 'row'
            }}>
            <View style={{flex:1,justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => {this.toggleExamplesModal()}}>
                    <Text>Examples</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:1,justifyContent: 'center', alignItems: 'flex-end'}} >
                <TouchableOpacity onPress={() => {this.props.runCode()}}>
                    <Text>Run</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  }
}