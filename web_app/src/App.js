import React, { Component } from 'react';
import axios from 'axios';
import Map from './components/Map';

const POI_SERVICE_URI = process.env.REACT_APP_POI_SERVICE_URI;

const CENTRE = '@51.4663,-2.6012';
const SERVICE = POI_SERVICE_URI + '/' + CENTRE;

class App extends Component {
  state = {
    buildings: [],
  };

  async componentDidMount() {
    console.log('POI_SERVICE_URI: ', POI_SERVICE_URI);
    const res = await axios.get(SERVICE);
    const buildings = res.data.points;
    this.setState({ buildings: buildings });
  }

  render() {
    return <Map buildings={this.state.buildings} center={[51.4663, -2.6012]} />;
  }
}

export default App;
