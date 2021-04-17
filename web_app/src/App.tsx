import React, { Component } from "react";
import { Map } from "./components/Map";
import { BuildingsGateway } from "./lib/gateways/BuildingsGateway";

class App extends Component {
  render() {
    return (
      <Map
        poiGateway={new BuildingsGateway()}
        centre={[51.4846117, -0.0072328]}
      />
    );
  }
}

export default App;
