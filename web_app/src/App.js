import React, { Component } from 'react';
import axios from 'axios';
import Map from './components/Map';

const CENTRE = '@51.4663,-2.6012';
const SERVICE = 'http://localhost:8875/buildings/' + CENTRE;

class App extends Component {
  state = {
    buildings: [],
  };

  async componentDidMount() {
    const res = await axios.get(SERVICE);
    const buildings = res.data.points;
    this.setState({ buildings: buildings });
  }

  render() {
    return <Map buildings={this.state.buildings} center={[51.4663, -2.6012]} />;
  }
}

export default App;
