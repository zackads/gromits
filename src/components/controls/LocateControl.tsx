import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";
import "leaflet.locatecontrol";

export const LocateControl = createControlComponent((props) => L.control.locate({
    keepCurrentZoomLevel: true
}));
