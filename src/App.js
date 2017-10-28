import React, { Component } from 'react';
import AppNavigator from './components/Navigator';

class App extends Component {
  render() {
    return (
      <AppNavigator
        ref={nav => {
            this.navigator = nav;
        }}
        onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }
}


export default App;