import axios from "axios";
import { IPointOfInterest } from "../entities/IPointOfInterest";
import { LatLng } from "../entities/LatLng";
import { Polygon } from "../entities/Polygon";
import { IPoiGateway } from "./IPoiGateway";

export class BuildingsGateway implements IPoiGateway {
  private readonly POI_SERVICE_URI =
    "https://l5m7m3ixeb.execute-api.eu-west-2.amazonaws.com";
  private readonly FETCH_NEAR_ENDPOINT = "/dev/buildings";
  private readonly FETCH_WITHIN_ENDPOINT = "/dev/buildings/polygon";

  private static polygonParam(polygon: Polygon) {
    return polygon.flat().flat().join();
  }

  public async fetchNear(point: LatLng): Promise<IPointOfInterest[]> {
    try {
      const { data: responseBody } = await axios.get(
        this.POI_SERVICE_URI +
          this.FETCH_NEAR_ENDPOINT +
          "/" +
          BuildingsGateway.locationParam(point)
      );
      return responseBody.data;
    } catch (error) {
      throw error;
    }
  }

  private static locationParam(latlng: LatLng) {
    return `@${latlng[0]},${latlng[1]}`;
  }

  public async fetchWithin(polygon: Polygon): Promise<IPointOfInterest[]> {
    try {
      const { data: responseBody } = await axios.get(
        this.POI_SERVICE_URI +
          this.FETCH_WITHIN_ENDPOINT +
          "?polygon=" +
          BuildingsGateway.polygonParam(polygon)
      );
      return responseBody.data;
    } catch (error) {
      throw error;
    }
  }
}
