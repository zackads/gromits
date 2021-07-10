import axios from "axios";
import { Landmark } from "../entities/Landmark";
import { Polygon } from "../entities/Polygon";
import { LandmarkGateway } from "./LandmarkGateway";

export class ApiLandmarkGateway implements LandmarkGateway {
  private readonly POI_SERVICE_URI =
    "https://l5m7m3ixeb.execute-api.eu-west-2.amazonaws.com";
  private readonly FETCH_WITHIN_ENDPOINT = "/dev/buildings/polygon";

  private static polygonParam(polygon: Polygon) {
    return polygon.flat().flat().join();
  }

  public async fetchWithin(polygon: Polygon): Promise<Landmark[]> {
    try {
      const { data: responseBody } = await axios.get(
        this.POI_SERVICE_URI +
          this.FETCH_WITHIN_ENDPOINT +
          "?polygon=" +
          ApiLandmarkGateway.polygonParam(polygon)
      );
      return responseBody.data;
    } catch (error) {
      throw error;
    }
  }
}
