import { createControlComponent } from "@react-leaflet/core";
import L from "leaflet";
import "leaflet-control-geocoder";
import { useMap } from "react-leaflet";

export const SearchControl = createControlComponent((props) => {
  const map = useMap();
  // @ts-ignore
  return new L.Control.Geocoder({
    position: "topleft",
    defaultMarkGeocode: false,
  }).on(
    "markgeocode",
    function (e: {
      geocode: {
        center: L.LatLngLiteral | L.LatLngTuple;
        name: ((layer: L.Layer) => L.Content) | L.Content | L.Popup;
      };
    }) {
      map.flyTo(e.geocode.center);
    }
  );
});
