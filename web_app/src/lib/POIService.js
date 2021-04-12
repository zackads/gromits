const axios = require('axios');

const POI_SERVICE_URI = process.env.REACT_APP_POI_SERVICE_URI;

export const POIService = {
  getBuildingsNear: async (point) => {
    try {
      const { data: response } = await axios.get(
        'https://' + POI_SERVICE_URI + '/' + locationParam(point)
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};

const locationParam = (latlong) => `@${latlong.lat},${latlong.lng}`;
