interface ListedBuilding {
  name: string;
  listEntry: number;
  location: string;
  grade: BuildingGrades;
  hyperlink: string;
}

interface Geometry {
  type: Shapes;
  coordinates: LatLng;
}

export interface Landmark {
  id: string;
  properties: ListedBuilding;
  geometry: Geometry;
}

export enum BuildingGrades {
  one = "I",
  two = "II*",
  three = "II",
}

export enum Shapes {
  Point = "POINT",
}
