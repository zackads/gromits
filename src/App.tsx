import { FunctionComponent } from "react";
import { MapContainerProps } from "react-leaflet";
import { FullscreenControl } from "./components/controls/FullscreenControl";
import { LocateControl } from "./components/controls/LocateControl";
import { SearchControl } from "./components/controls/SearchControl";
import { IMarkerOptions, Map } from "./components/Map";
import { ApiLandmarkGateway } from "./lib/gateways/ApiLandmarkGateway";

const App: FunctionComponent = (): JSX.Element => {
  const mapOptions: MapContainerProps = {
    center: [51.454095, -2.595995],
    zoom: 16,
    minZoom: 10,
    maxZoom: 20,
  };

  const markerOptions: IMarkerOptions = {
    maxCount: 500,
    tooManyMessage: "Uh-oh - too many buildings!  Try zooming in.",
  };

  return (
    <Map
      poiGateway={new ApiLandmarkGateway()}
      mapOptions={mapOptions}
      markerOptions={markerOptions}
    >
      <FullscreenControl />, <LocateControl />, <SearchControl />,
    </Map>
  );
};

export default App;
