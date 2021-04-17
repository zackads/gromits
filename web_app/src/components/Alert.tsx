import React, { FunctionComponent } from "react";
import { Popup, useMap } from "react-leaflet";

export const Alert: FunctionComponent = ({ children }) => (
  <Popup position={useMap().getCenter()} autoPan={false}>
    {children}
  </Popup>
);
