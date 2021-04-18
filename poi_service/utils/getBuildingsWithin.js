const { transform } = require("./transform");

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

  return db
    .collection("buildings")
    .find(query)
    .toArray()
    .then((buildings) => {
      console.log(buildings[0]);
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify(buildings.map(transform)),
      };
    })
    .catch((error) => {
      console.log("=> an error occurred: ", error);
      return { statusCode: 500, body: "error" };
    });
}

module.exports = { getBuildingsWithin };
