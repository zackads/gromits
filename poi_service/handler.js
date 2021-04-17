"use strict";
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`;
const transform = require("transform");

let cachedDb = null;

function connectToDatabase(uri) {
  console.log("=> connect to database");

  if (cachedDb) {
    console.log("=> using cached database instance");
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((client) => {
      cachedDb = client.db("poi");
      return cachedDb;
    })
    .catch((error) => {
      console.log("=> an error occurred: ", error);
    });
}

function queryDatabase(db, location) {
  console.log(`=> query database for buildings near ${location}`);

  const query = {
    geometry: {
      $near: {
        $maxDistance: 1000,
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

const parseLocationParameter = (locationString) => {
  // "@51.47552,-2.60833" ==> [-2.60833, 51.47552]
  return locationString
    .substring(1)
    .split(",")
    .map((datum) => parseFloat(datum))
    .reverse();
};

module.exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const location = parseLocationParameter(event.pathParameters.location);

  console.log("event: ", event);

  connectToDatabase(MONGODB_URI)
    .then((db) => queryDatabase(db, location))
    .then((result) => {
      callback(null, result);
    })
    .catch((error) => {
      console.log("=> an error occurred: ", error);
      callback(error);
    });
};
