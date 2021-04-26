import { LatLng } from "../entities/LatLng";
import { Polygon } from "../entities/Polygon";
import { BuildingsGateway } from "./BuildingsGateway";

const axios = require("axios");

jest.mock("axios");

describe("fetchNear()", () => {
  const FETCH_NEAR_POINT_ENDPOINT =
    "https://l5m7m3ixeb.execute-api.eu-west-2.amazonaws.com/dev/buildings";

  const arbitraryPoint: LatLng = [51.4549089, -2.630044];
  const arbitraryPointString = "@51.4549089,-2.630044";

  it("connects to the endpoint", () => {
    axios.get.mockResolvedValue({ data: [] });

    new BuildingsGateway().fetchNear(arbitraryPoint);

    expect(axios.get).toHaveBeenCalledWith(
      FETCH_NEAR_POINT_ENDPOINT + "/" + arbitraryPointString
    );
  });
});

describe("fetchWithin()", () => {
  const FETCH_WITHIN_ENDPOINT =
    "https://l5m7m3ixeb.execute-api.eu-west-2.amazonaws.com/dev/buildings/polygon";

  const arbitraryPolygon: Polygon = [
    [
      [1, 2],
      [3, 4],
      [1, 2],
    ],
  ];
  const arbitraryPolygonString = "1,2,3,4,1,2";

  it("connects to the endpoint", () => {
    axios.get.mockResolvedValue({ data: [] });

    new BuildingsGateway().fetchWithin(arbitraryPolygon);

    expect(axios.get).toHaveBeenCalledWith(
      FETCH_WITHIN_ENDPOINT + "?polygon=" + arbitraryPolygonString
    );
  });
});
