import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLng } from "../lib/entities/LatLng";
import { IPointOfInterest } from "../lib/entities/IPointOfInterest";
import { IPoiGateway } from "../lib/gateways/IPoiGateway";
import { buildingIcon } from "./icons/BuildingIcons";
import { LoadingSpinner } from "./LoadingSpinner";
import { Alert } from "./Alert";
import { LatLngBounds } from "leaflet";
import { Polygon } from "../lib/entities/Polygon";

interface MapProps {
  centre: LatLng;
  poiGateway: IPoiGateway;
  maxMarkerCount?: Number;
  children: React.ReactNode;
}

export const Map: FunctionComponent<MapProps> = ({
  centre,
  poiGateway,
  children,
  maxMarkerCount = 1000,
}: MapProps): JSX.Element => {
  return (
    <MapContainer
      center={centre}
      zoom={16}
      style={{ height: "100vh", width: "100%" }}
      tap={false}
    >
      {children}
      <POIMap poiGateway={poiGateway} maxMarkerCount={maxMarkerCount} />
    </MapContainer>
  );
};

interface POIMapProps {
  poiGateway: IPoiGateway;
  maxMarkerCount: Number;
}

interface BuildingsState {
  isLoading: boolean;
  error: boolean;
  points: IPointOfInterest[];
}

const POIMap: FunctionComponent<POIMapProps> = ({
  poiGateway,
  maxMarkerCount,
}: POIMapProps): JSX.Element => {
  const [state, setState] = useState<BuildingsState>({
    isLoading: true,
    error: false,
    points: [],
  });
  const map = useMapEvents({
    moveend() {
      fetchBuildings();
    },
  });

  const fetchBuildings = useCallback(async () => {
    setState({ ...state, isLoading: true });
    try {
      const points = await poiGateway.fetchWithin(viewport(map.getBounds()));
      setState({
        ...state,
        isLoading: false,
        error: false,
        points,
      });
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        error: error?.message,
      });
    }
  }, [state, map, poiGateway]);

  // Run on first render only
  useEffect((): void => {
    fetchBuildings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        className="greyscale"
      />
      {state.isLoading && <LoadingSpinner>Loading...</LoadingSpinner>}
      {state.points.length > maxMarkerCount ? (
        <Alert> Uh-oh! Too many buildings. Try zooming in.</Alert>
      ) : (
        <BuildingMarkers buildings={state.points} />
      )}
    </>
  );
};

interface BuildingMarkersProps {
  buildings: IPointOfInterest[];
}

const BuildingMarkers = ({ buildings }: BuildingMarkersProps): JSX.Element => (
  <>
    {buildings.map((building) => (
      <Marker
        position={building.geometry.coordinates}
        key={building.id}
        alt={"Listed building"}
        title={building.properties.name}
        icon={buildingIcon(building)}
      >
        <Popup key={building.id}>
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
    ))}
  </>
);

const viewport = (bounds: LatLngBounds): Polygon => {
  return [
    [
      [bounds.getNorthWest().lat, bounds.getNorthWest().lng],
      [bounds.getNorthEast().lat, bounds.getNorthEast().lng],
      [bounds.getSouthEast().lat, bounds.getSouthEast().lng],
      [bounds.getSouthWest().lat, bounds.getSouthWest().lng],
      [bounds.getNorthWest().lat, bounds.getNorthWest().lng],
    ],
  ];
};
