import React, { Component } from 'react';
import { Map } from './components/Map';
import { BuildingsGateway } from './lib/gateways/BuildingsGateway';

class App extends Component {
  render() {
    return <Map poiGateway={new BuildingsGateway()} />;
  }
}

export default App;
