import React, { FunctionComponent } from "react";
import { IMarkerOptions, Map } from "./components/Map";
import { BuildingsGateway } from "./lib/gateways/BuildingsGateway";
import { LocateControl } from "./components/controls/LocateControl";
import { SearchControl } from "./components/controls/SearchControl";
import { FullscreenControl } from "./components/controls/FullscreenControl";

const App: FunctionComponent = (): JSX.Element => {
  const markerOptions: IMarkerOptions = {
    maxCount: 500,
    tooManyMessage: "Uh-oh - too many buildings!  Try zooming in.",
  };

  return (
    <Map
      poiGateway={new BuildingsGateway()}
      centre={[51.454095, -2.595995]}
      markerOptions={markerOptions}
    >
      <FullscreenControl />, <LocateControl />, <SearchControl />,
    </Map>
  );
};

export default App;
