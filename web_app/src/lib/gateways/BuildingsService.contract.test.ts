import axios from "axios";
import { IPointOfInterest } from "../entities/IPointOfInterest";

describe("The buildings POI service", () => {
  it("complies with the contract", async () => {
    const POI_SERVICE_URI =
      "https://l5m7m3ixeb.execute-api.eu-west-2.amazonaws.com/dev/buildings";
    const queryParam = "@51.4663,-2.6012";
    const { data: buildings } = await axios.get(
      POI_SERVICE_URI + "/" + queryParam
    );
    const poi: IPointOfInterest = buildings[0];

    expect(typeof poi.id).toBe("string");
    expect(typeof poi.properties.name).toBe("string");
    expect(typeof poi.properties.listEntry).toBe("number");
    expect(typeof poi.properties.location).toBe("string");
    expect(typeof poi.properties.grade).toBe("string");
    expect(typeof poi.properties.hyperlink).toBe("string");
    expect(typeof poi.geometry.type).toBe("string");
    expect(typeof poi.geometry.coordinates[0]).toBe("number");
    expect(typeof poi.geometry.coordinates[1]).toBe("number");
  });
});
