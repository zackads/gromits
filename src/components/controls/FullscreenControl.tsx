import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";
import "leaflet-fullscreen";

export const FullscreenControl = createControlComponent(
  (props) => new L.Control.Fullscreen()
);
