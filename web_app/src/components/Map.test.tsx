import { render, waitFor, screen } from "@testing-library/react";
import { Map } from "./Map";
import { LatLng } from "../lib/entities/LatLng";
import {
  BuildingGrades,
  IPointOfInterest,
  Shapes,
} from "../lib/entities/IPointOfInterest";

describe("Map", () => {
  const arbitrary_point: LatLng = [51.4846117, -0.0072328];

  it("queries the injected poiGateway for POI markers to display", async () => {
    const mockPoiGateway = {
      fetchNear: jest.fn().mockResolvedValue([]),
    };

    render(<Map centre={arbitrary_point} poiGateway={mockPoiGateway} />);

    await waitFor(() => {
      expect(mockPoiGateway.fetchNear).toHaveBeenCalledWith(arbitrary_point);
    });
  });

  it("displays markers", async () => {
    const building: IPointOfInterest = {
      id: "1",
      properties: {
        name: "Nakatomi Plaza",
        listEntry: 42,
        location: "2121 Avenue of the Stars, Los Angeles",
        grade: BuildingGrades.two,
        hyperlink: "https://en.wikipedia.org/wiki/Die_Hard_(film_series)",
      },
      geometry: { type: Shapes.Point, coordinates: arbitrary_point },
    };
    const mockPoiGateway = {
      fetchNear: jest.fn().mockResolvedValue([building]),
    };

    render(<Map centre={arbitrary_point} poiGateway={mockPoiGateway} />);

    await waitFor(() => {
      expect(screen.getAllByAltText("Listed building")).toHaveLength(1);
    });
  });
});
