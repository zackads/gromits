const { queryDb } = require("./queryDb");

function getBuildingsNear(db, location, distance = 1000) {
  console.log(`=> query database for buildings near ${location}`);

  const query = {
    geometry: {
      $near: {
        $maxDistance: distance,
        $geometry: {
          type: "Point",
          coordinates: location,
        },
      },
    },
  };

  return queryDb(db, query);
}

module.exports = { getBuildingsNear: getBuildingsNear };
