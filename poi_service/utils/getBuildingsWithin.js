const { queryDb } = require("./queryDb");

function getBuildingsWithin(db, polygon) {
  console.log(
    `=> query database for buildings within ${JSON.stringify(polygon)}`
  );

  const query = {
    geometry: {
      $geoWithin: {
        $geometry: {
          type: "Polygon",
          coordinates: polygon,
        },
      },
    },
  };

  return queryDb(db, query);
}

module.exports = { getBuildingsWithin };
