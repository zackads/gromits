import React, { Component } from "react";
import { Map } from "./components/Map";
import { BuildingsGateway } from "./lib/gateways/BuildingsGateway";

class App extends Component {
  render() {
    return (
      <Map
        poiGateway={new BuildingsGateway()}
        centre={[51.454095, -2.595995]}
      />
    );
  }
}

export default App;
