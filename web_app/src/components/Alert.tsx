import React, { FunctionComponent } from "react";
import { Popup, useMap } from "react-leaflet";

export const Alert: FunctionComponent = ({ children }) => {
  const mapCentre = useMap().getCenter();

  return (
    <Popup
      position={mapCentre}
      autoPan={false}
      closeButton={false}
      className="alert"
      autoClose={false}
    >
      <div role="alert">{children}</div>
    </Popup>
  );
};
