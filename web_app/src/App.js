import React, { Component } from 'react';
import { Map } from './components/Map';
import poiGateway from './lib/adapters/poiGateway';
class App extends Component {
  render() {
    return <Map poiGateway={poiGateway} />;
  }
}

export default App;
