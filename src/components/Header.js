
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList } from 'react-native';

const codeData = [
    {
        name: 'Binary Search Tree',
        code: 'console.log("sup")'
    },{
        name: 'Depth First Search',
        code: 'console.log("sup yo")'
    }
];

const ListItem = ({item, onPress}) => 
    <View style={{
        borderBottomWidth: 0.5,
        borderColor: '#d6d7da',
        padding: 15
    }}>
        <Text onPress={() => onPress(item.code)}>{item.name}</Text>
    </View>

export default class Header extends Component {
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
            backgroundColor: 'white'
        }}
    >
        <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.isExamplesModalDisplayed}
            onRequestClose={() => {this.toggleExamplesModal()}}
        >
            <View style={{marginTop: 20}}>
                <View style={{borderTopWidth:0.5, borderColor:'#d6d7da'}}>
                    <FlatList
                        data={codeData}
                        renderItem={({item}) => <ListItem item={item} onPress={code => {this.props.generateCode(code); this.toggleExamplesModal()}}/>}
                    />
                    <Text onPress={() => this.toggleExamplesModal()}>Hide Modal</Text>
                </View>
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