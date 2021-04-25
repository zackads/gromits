import { createControlComponent } from "@react-leaflet/core";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "../../../node_modules/leaflet-geosearch/dist/geosearch.css";

const provider = new OpenStreetMapProvider();

// @ts-ignore
const searchControl = new GeoSearchControl({
  provider: provider,
  retainZoomLevel: true,
  autoClose: true,
});

export const SearchControl = createControlComponent((props) => searchControl);
