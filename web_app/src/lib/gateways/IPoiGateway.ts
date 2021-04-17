import {IPointOfInterest} from "../entities/IPointOfInterest";
import {LatLng} from "../entities/LatLng";

export interface IPoiGateway {
    fetchNear(point: LatLng): Promise<IPointOfInterest[]>
}