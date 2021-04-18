import React, { FunctionComponent } from "react";
import { Popup, useMap } from "react-leaflet";

export const LoadingSpinner: FunctionComponent = () => {
  const mapCentre = useMap().getCenter();

  return (
    <Popup
      position={mapCentre}
      autoPan={false}
      closeButton={false}
      className="loading-popup"
    >
      <div role="progressbar" className="lds-dual-ring" />
    </Popup>
  );
};
