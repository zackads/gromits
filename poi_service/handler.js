"use strict";
const { connectToDatabase } = require("./utils/connectToDatabase");
const { getBuildingsNear } = require("./utils/getBuildingsNear");
const { getBuildingsWithin } = require("./utils/getBuildingsWithin");
const { parsePointParameter, parsePolygonParameter } = require("./utils/parse");

module.exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("event: ", event);

  switch (event.resource) {
    case "/buildings/{location}": {
      const location = parsePointParameter(event.pathParameters.location);
      connectToDatabase()
        .then((db) => getBuildingsNear(db, location))
        .then((result) => {
          callback(null, result);
        })
        .catch((error) => {
          console.log("=> an error occurred: ", error);
          callback(error);
        });
      break;
    }
    case "/buildings/polygon": {
      const polygon = parsePolygonParameter(
        event.queryStringParameters["polygon"]
      );
      connectToDatabase()
        .then((db) => getBuildingsWithin(db, polygon))
        .then((result) => {
          callback(null, result);
        })
        .catch((error) => {
          console.log("=> an error occurred: ", error);
          callback(error);
        });
      break;
    }
    default: {
      throw new Error("=> unrecognised resource");
    }
  }
};
