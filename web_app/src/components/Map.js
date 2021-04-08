import axios from 'axios';
import React, { Component, useState, useEffect, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { POIService } from '../lib/POIService';

export const Map = ({ positionDefault = [51.4663, -2.6012] }) => {
  return (
    <MapContainer
      center={positionDefault}
      zoom={16}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <BuildingMarkers />
    </MapContainer>
  );
};

function BuildingMarkers() {
  const [buildings, setBuildings] = useState({
    isLoading: false,
    error: false,
    points: [],
  });

  const map = useMapEvents({
    mouseup() {
      fetchBuildings();
    },
  });

  const fetchBuildings = useCallback(async () => {
    setBuildings({ ...buildings, isLoading: true });
    try {
      const points = await POIService.getBuildingsNear(map.getCenter());
      setBuildings({
        ...buildings,
        isLoading: false,
        error: false,
        points,
      });
    } catch (error) {
      setBuildings({
        ...buildings,
        isLoading: false,
        error: error?.message,
      });
    }
  });

  useEffect(() => fetchBuildings(), []);

  return buildings.points.map((building, index) => {
    return (
      <Marker
        position={[
          building.geometry.coordinates[1],
          building.geometry.coordinates[0],
        ]}
        key={index}
      >
        <Popup>Building!</Popup>
      </Marker>
    );
  });
}
