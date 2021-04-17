import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { Map } from "./Map";

import { LatLng } from "../lib/entities/LatLng";
import {
  BuildingGrades,
  IPointOfInterest,
  Shapes,
} from "../lib/entities/IPointOfInterest";
import { IPoiGateway } from "../lib/gateways/IPoiGateway";

describe("Map", () => {
  const mapCentre: LatLng = [51.4846117, -0.0072328];

  const building: IPointOfInterest = {
    id: "1",
    properties: {
      name: "Nakatomi Plaza",
      listEntry: 42,
      location: "2121 Avenue of the Stars, Los Angeles",
      grade: BuildingGrades.two,
      hyperlink: "https://en.wikipedia.org/wiki/Die_Hard_(film_series)",
    },
    geometry: { type: Shapes.Point, coordinates: [51.4846117, -0.0072328] },
  };

  let mockPoiGateway: IPoiGateway;

  beforeEach(() => {
    mockPoiGateway = {
      fetchNear: jest.fn().mockResolvedValue([building]),
    };
  });

  it("queries the injected poiGateway for POI markers to display", async () => {
    render(<Map centre={mapCentre} poiGateway={mockPoiGateway} />);

    await waitFor(() => {
      expect(mockPoiGateway.fetchNear).toHaveBeenCalledWith(mapCentre);
    });
  });

  it("user can see points of interest", async () => {
    render(<Map centre={mapCentre} poiGateway={mockPoiGateway} />);

    await waitFor(() => {
      expect(screen.getAllByAltText("Listed building")).toHaveLength(1);
    });
  });

  it("user can click on a point of interest to see its relevant properties", async () => {
    render(<Map centre={mapCentre} poiGateway={mockPoiGateway} />);

    await waitFor(() => {
      screen.getByAltText("Listed building").click();
      expect(screen.getByText(building.properties.name, { exact: false }));
      expect(screen.getByText(building.properties.grade, { exact: false }));
    });
  });
});
