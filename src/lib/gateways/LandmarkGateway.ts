import { Landmark } from "../entities/Landmark";
import { Polygon } from "../entities/Polygon";

export interface LandmarkGateway {
  fetchWithin(polygon: Polygon): Promise<Landmark[]>;
}
