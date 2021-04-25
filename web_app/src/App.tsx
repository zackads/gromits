import React, { FunctionComponent, Component } from "react";
import { IMarkerOptions, Map } from "./components/Map";
import { BuildingsGateway } from "./lib/gateways/BuildingsGateway";
import { LocateControl } from "./components/controls/LocateControl";
import { SearchControl } from "./components/controls/SearchControl";

class App extends Component {
  render() {
    const markerOptions: IMarkerOptions = {
      maxCount: 1000,
      tooManyMessage: "Uh-oh - too many buildings!  Try zooming in."
    };

    return (
      <Map
        poiGateway={new BuildingsGateway()}
        centre={[51.454095, -2.595995]}
        markerOptions={markerOptions}
      >
        <LocateControl />, <SearchControl />
      </Map>
    );
  }
}

export default App;
