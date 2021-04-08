import React, { Component } from 'react';
import axios from 'axios';
import { MapComponent } from './components/Map';

const POI_SERVICE_URI = process.env.REACT_APP_POI_SERVICE_URI;

const CENTRE = '@51.4663,-2.6012';
const SERVICE = 'http://' + POI_SERVICE_URI + '/' + CENTRE;

class App extends Component {
  render() {
    return <MapComponent />;
  }
}

export default App;
