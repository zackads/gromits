import { IPointOfInterest } from "../entities/IPointOfInterest";
import { LatLng } from "../entities/LatLng";
import { Polygon } from "../entities/Polygon";

export interface IPoiGateway {
  fetchNear(point: LatLng): Promise<IPointOfInterest[]>;

  fetchWithin(polygon: Polygon): Promise<IPointOfInterest[]>;
}
