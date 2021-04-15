import React, { useState, useCallback, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';

export const Map = ({
  centre = { lat: 51.4663, lng: -2.6012 },
  poiGateway,
}) => {
  return (
    <MapContainer
      center={[centre.lat, centre.lng]}
      zoom={16}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <BuildingMarkers poiGateway={poiGateway} />
    </MapContainer>
  );
};

const BuildingMarkers = ({ poiGateway }) => {
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
      const points = await poiGateway.getBuildingsNear(map.getCenter());
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
  }, [buildings, map, poiGateway]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Popup>
          <h2>{building.properties.Name}</h2>
          <h3>Grade {building.properties.Grade}</h3>
          <a
            href={building.properties.Hyperlink}
            target='_blank'
            rel='noreferrer'
          >
            Check it out
          </a>
        </Popup>
      </Marker>
    );
  });
};
