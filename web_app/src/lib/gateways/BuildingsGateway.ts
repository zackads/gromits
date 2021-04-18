import axios from "axios";
import { IPoiGateway } from "./IPoiGateway";
import { IPointOfInterest } from "../entities/IPointOfInterest";
import { LatLng } from "../entities/LatLng";

export class BuildingsGateway implements IPoiGateway {
  private readonly POI_SERVICE_URI =
    "https://l5m7m3ixeb.execute-api.eu-west-2.amazonaws.com/dev/buildings";

  public async fetchNear(point: LatLng): Promise<IPointOfInterest[]> {
    try {
      const { data: responseBody } = await axios.get(
        this.POI_SERVICE_URI + "/" + BuildingsGateway.locationParam(point)
      );
      return responseBody.data;
    } catch (error) {
      throw error;
    }
  }

  private static locationParam(latlng: LatLng) {
    return `@${latlng[0]},${latlng[1]}`;
  }
}
