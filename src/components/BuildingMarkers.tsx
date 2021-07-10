import { Marker, Popup } from "react-leaflet";
import { Landmark } from "../lib/entities/Landmark";
import { buildingIcon } from "./icons/BuildingIcons";

export interface BuildingMarkersProps {
  buildings: Landmark[];
}

export const BuildingMarkers = ({
  buildings,
}: BuildingMarkersProps): JSX.Element => (
  <>
    {buildings.map((building) => (
      <Marker
        position={building.geometry.coordinates}
        key={building.id}
        alt={"Listed building"}
        title={building.properties.name}
        icon={buildingIcon(building)}
      >
        <Popup key={building.id} autoClose={false} autoPan={false}>
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
