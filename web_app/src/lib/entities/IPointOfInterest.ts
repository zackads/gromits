import { LatLng } from "./LatLng";

interface IListedBuilding {
  name: string;
  listEntry: number;
  location: string;
  grade: BuildingGrades;
  hyperlink: string;
}

interface IGeometry {
  type: Shapes;
  coordinates: LatLng;
}

export interface IPointOfInterest {
  id: string;
  properties: IListedBuilding;
  geometry: IGeometry;
}

export enum BuildingGrades {
  one = "I",
  two = "II",
  three = "II*",
}

export enum Shapes {
  Point = "POINT",
}
