import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CodeEditor from './src/components/CodeEditor';
import Output from './src/components/Output';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: `console.log('Hello World!')`
    };
  }

  handleCodeChange = code => {
    this.setState({
      code
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 70,
            width: '100%',
            paddingTop: 20,
            backgroundColor: 'gray'
          }}
        >
          <Text>Hi</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignSelf: 'stretch'
          }}
        >
          <CodeEditor />
        </View>
        <View style={{ flex: 1 }}>
          <Output code={this.state.code} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
