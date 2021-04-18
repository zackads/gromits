import L from "leaflet";
import {
  BuildingGrades,
  IPointOfInterest,
} from "../../lib/entities/IPointOfInterest";

export const gradeIBuildingIcon = new L.Icon({
  iconUrl: "icons/building-grade-i.png",
  iconRetinaUrl: "icons/building-grade-i.png",
  iconSize: [48, 48],
  popupAnchor: [0, -20],
});

export const gradeIIStarBuildingIcon = new L.Icon({
  iconUrl: "icons/building-grade-ii*.png",
  iconRetinaUrl: "icons/building-grade-ii*.png",
  iconSize: [32, 32],
  popupAnchor: [0, -20],
});

export const gradeIIBuildingIcon = new L.Icon({
  iconUrl: "icons/building-grade-ii.png",
  iconRetinaUrl: "icons/building-grade-ii.png",
  iconSize: [24, 24],
  popupAnchor: [0, -20],
});

export const buildingIcon = (building: IPointOfInterest) => {
  switch (building.properties.grade) {
    case BuildingGrades.one:
      return gradeIBuildingIcon;
    case BuildingGrades.two:
      return gradeIIStarBuildingIcon;
    case BuildingGrades.three:
      return gradeIIBuildingIcon;
    default:
      throw new Error("Unrecognised building grade");
  }
};
