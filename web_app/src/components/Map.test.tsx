import { render, waitFor } from "@testing-library/react";
import { Map } from "./Map";
import {LatLng} from "../lib/entities/LatLng";

describe("Map", () => {
  const mockPoiGateway = {
    fetchNear: jest.fn().mockResolvedValue([]),
  };

  it("queries the injected poiGateway for POI markers to display", async () => {
    const centre: LatLng = [51.4846117, -0.0072328];
    render(<Map centre={centre} poiGateway={mockPoiGateway} />);

    await waitFor(() => {
      expect(mockPoiGateway.fetchNear).toHaveBeenCalledWith(centre);
    });
  });
});
