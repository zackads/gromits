import React from "react";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Map } from "./Map";

import { LatLng } from "../lib/entities/LatLng";
import {
  BuildingGrades,
  IPointOfInterest,
  Shapes,
} from "../lib/entities/IPointOfInterest";
import { IPoiGateway } from "../lib/gateways/IPoiGateway";

describe("Map", () => {
  const mapCentre: LatLng = [51.484573, -0.007307];

  let mockPoiGateway: IPoiGateway;

  beforeEach(() => {
    mockPoiGateway = {
      fetchNear: jest.fn(),
      fetchWithin: jest.fn().mockResolvedValue(buildings),
    };
  });

  it("displays a loading message while it gets POI markers", async () => {
    render(<Map poiGateway={mockPoiGateway} />);

    expect(await screen.findByRole("progressbar")).toBeVisible();
  });

  it("queries the injected poiGateway for POI markers to display", async () => {
    render(<Map poiGateway={mockPoiGateway} />);

    await waitFor(() => {
      expect(mockPoiGateway.fetchWithin).toHaveBeenCalled();
    });
  });

  it("hides the loading message when POI markers are displayed", async () => {
    render(<Map poiGateway={mockPoiGateway} />);

    await waitForElementToBeRemoved(() => screen.getByRole("progressbar"));
  });

  it("user can see points of interest", async () => {
    render(<Map poiGateway={mockPoiGateway} />);

    expect(await screen.findAllByAltText("Listed building")).toHaveLength(
      buildings.length
    );
  });

  it("user can click on a point of interest to see its relevant properties", async () => {
    const poi = buildings[0];

    render(<Map poiGateway={mockPoiGateway} />);

    await waitFor(() => {
      screen.getByTitle(poi.properties.name).click();
      expect(screen.getByText(poi.properties.name, { exact: false }));
      expect(screen.getByText(poi.properties.grade, { exact: false }));
    });
  });

  it("displays an alert rather than display too many markers", async () => {
    render(
      <Map
        poiGateway={mockPoiGateway}
        markerOptions={{ maxCount: 2, tooManyMessage: "too many" }}
      />
    );

    await waitFor(() =>
      expect(screen.queryByAltText("Listed building")).toBeNull()
    );
    expect(screen.getByRole("alert")).toHaveTextContent(/too many/i);
  });
});

const buildings: IPointOfInterest[] = [
  {
    id: "1",
    properties: {
      name: "Nakatomi Plaza",
      listEntry: 42,
      location: "2121 Avenue of the Stars, Los Angeles",
      grade: BuildingGrades.two,
      hyperlink: "https://en.wikipedia.org/wiki/Die_Hard_(film_series)",
    },
    geometry: { type: Shapes.Point, coordinates: [51.4846117, -0.0072328] },
  },
  {
    id: "2",
    properties: {
      name: "Wayne Manor",
      listEntry: 1664,
      location: "Gotham City",
      grade: BuildingGrades.three,
      hyperlink: "https://en.wikipedia.org/wiki/Batman",
    },
    geometry: { type: Shapes.Point, coordinates: [51.4755209, -2.6083328] },
  },
  {
    id: "3",
    properties: {
      name: "The Liver Buildings",
      listEntry: 64,
      location: "Albert Dock, Liverpool",
      grade: BuildingGrades.one,
      hyperlink: "https://en.wikipedia.org/wiki/Royal_Liver_Building",
    },
    geometry: { type: Shapes.Point, coordinates: [53.4058, -2.9958] },
  },
];
