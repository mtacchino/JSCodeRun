
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
    Image,
    Platform
} from 'react-native';
import { ScreenNames } from '../App';
import ExamplesModal from '../screens/ExamplesModal';
import AboutModal from '../screens/AboutModal';
import codeExamples from '../constants/examples.js';

const styles = StyleSheet.create({
    container: {
        height: 55,
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 20 : 0,
    },
    headerBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10
    },
    headerText: {
        fontSize: 22,
        color: 'white'
    },
    runButton: {
        height: 40,
        width: 40
    },
    hamburger:{
        height: 35,
        width: 35,
        tintColor: 'white'
    }
});

export default class HeaderBar extends Component {
  hideModal = () => {
    this.props.navigation.goBack();
  }

  renderModal() {
    switch(this.props.navigation.state.routeName) {
      case ScreenNames.EXAMPLES_SCREEN:
        return <ExamplesModal onClose={this.hideModal} generateCode={this.props.generateCode} />;
      case ScreenNames.ABOUT_SCREEN:
        return <AboutModal onClose={this.hideModal} />;
      default:
        return null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderModal()}
        <View style={styles.headerBar}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                <Image style={styles.hamburger} source={require('../../assets/hamburger.png')} />
            </TouchableOpacity>
            <Text style={styles.headerText}>JS Code Run</Text>
            <TouchableOpacity onPress={() => {this.props.runCode()}}>
                <Image style={styles.runButton} source={require('../../assets/run.png')} />
            </TouchableOpacity>

        </View>
      </View>
    );
  }
}