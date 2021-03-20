"use strict";

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _building = require("./models/building");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = 80;

_mongoose["default"].connect("mongodb://localhost", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;
db.on("error", console.error.bind(console, "MongoDB connection error: "));
app.listen(port, function () {
  console.log("Listening at port 80...");
});
app.get("/buildings", function (req, res) {
  return _building.Building.find(function (err, buildings) {
    return res.send({
      points: buildings
    });
  });
});