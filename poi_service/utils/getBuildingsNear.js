const { transform } = require("./transform");

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

module.exports = { getBuildingsNear: getBuildingsNear };
