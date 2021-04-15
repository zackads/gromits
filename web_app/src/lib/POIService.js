const axios = require('axios');

const POI_SERVICE_URI =
  'https://l5m7m3ixeb.execute-api.eu-west-2.amazonaws.com/dev/buildings';

export const POIGateway = {
  getBuildingsNear: async (point) => {
    try {
      const { data: response } = await axios.get(
        POI_SERVICE_URI + '/' + locationParam(point)
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

const locationParam = (latlong) => `@${latlong.lat},${latlong.lng}`;
