"use strict";
const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`;
const { queryDatabase } = require("./utils/db");

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
