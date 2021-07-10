import { LatLngBounds } from "leaflet";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { Landmark } from "../lib/entities/Landmark";
import { Polygon } from "../lib/entities/Polygon";
import { LandmarkGateway } from "../lib/gateways/LandmarkGateway";
import { Alert } from "./Alert";
import { BuildingMarkers } from "./BuildingMarkers";
import { LoadingSpinner } from "./LoadingSpinner";

export interface IMarkerOptions {
  maxCount: number;
  tooManyMessage: string;
}

class MapContainerProps {}

export interface IMapProps {
  poiGateway: LandmarkGateway;
  mapOptions?: MapContainerProps;
  markerOptions?: IMarkerOptions;
  children?: React.ReactNode;
}

const defaultMapOptions = {
  center: [51.454095, -2.595995],
  zoom: 16,
  minZoom: 10,
  maxZoom: 20,
};

const defaultMarkerOptions = {
  maxCount: 500,
  tooManyMessage: "Uh-oh!  Too many buildings.  Try zooming in.",
};

export const Map: FunctionComponent<IMapProps> = ({
  poiGateway,
  mapOptions = defaultMapOptions,
  markerOptions = defaultMarkerOptions,
  children,
}: IMapProps): JSX.Element => {
  return (
    <MapContainer {...mapOptions} tap={false}>
      {children}
      <POIMap poiGateway={poiGateway} markerOptions={markerOptions} />
    </MapContainer>
  );
};

interface IPOIMapProps {
  poiGateway: LandmarkGateway;
  markerOptions: IMarkerOptions;
}

interface IBuildingsState {
  isLoading: boolean;
  error: boolean;
  points: Landmark[];
}

const POIMap: FunctionComponent<IPOIMapProps> = ({
  poiGateway,
  markerOptions,
}: IPOIMapProps): JSX.Element => {
  const [state, setState] = useState<IBuildingsState>({
    isLoading: true,
    error: false,
    points: [],
  });
  const map = useMapEvents({
    moveend() {
      fetchBuildings();
    },
    popupopen(e) {
      var markerLocation = map.project(e.target._popup._latlng);
      map.flyTo(map.unproject(markerLocation));
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
        maxNativeZoom={19}
        maxZoom={30}
      />
      {state.isLoading && <LoadingSpinner>Loading...</LoadingSpinner>}
      {state.points.length > markerOptions.maxCount ? (
        <Alert>{markerOptions.tooManyMessage}</Alert>
      ) : (
        <BuildingMarkers buildings={state.points} />
      )}
    </>
  );
};

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
