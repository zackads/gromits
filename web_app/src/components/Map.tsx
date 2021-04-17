import React, {
  useState,
  useCallback,
  useEffect,
  FunctionComponent,
} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { LatLng } from "../lib/entities/LatLng";
import { IPointOfInterest } from "../lib/entities/IPointOfInterest";
import { IPoiGateway } from "../lib/gateways/IPoiGateway";

interface MapProps {
  centre?: LatLng;
  poiGateway: IPoiGateway;
}

export const Map: FunctionComponent<MapProps> = ({
  centre = [51.4663, -2.6012],
  poiGateway,
}: MapProps): JSX.Element => {
  return (
    <MapContainer
      center={centre}
      zoom={16}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <BuildingMarkers poiGateway={poiGateway} />
    </MapContainer>
  );
};

interface BuildingMarkersProps {
  poiGateway: IPoiGateway;
}

interface BuildingsState {
  isLoading: boolean;
  error: boolean;
  points: IPointOfInterest[];
}

const BuildingMarkers = ({ poiGateway }: BuildingMarkersProps): JSX.Element => {
  const [buildings, setBuildings] = useState<BuildingsState>({
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
      const mapCentre = map.getCenter();
      const points = await poiGateway.fetchNear([mapCentre.lat, mapCentre.lng]);
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

  // Necessary to fetch buildings on first render
  useEffect((): void => {
    fetchBuildings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markers = buildings.points
    ? buildings.points.map((building, index) => (
        <Marker
          position={[
            building.geometry.coordinates[1],
            building.geometry.coordinates[0],
          ]}
          key={index}
          alt="Listed building"
        >
          <Popup>
            <h2>{building.properties.name}</h2>
            <h3>Grade {building.properties.grade}</h3>
            <a
              href={building.properties.hyperlink}
              target="_blank"
              rel="noreferrer"
            >
              Check it out
            </a>
          </Popup>
        </Marker>
      ))
    : [];

  return <>{markers}</>;
};
