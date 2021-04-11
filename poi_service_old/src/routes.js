const express = require('express');
const cors = require('cors');
import { query } from './db';

export const router = express.Router();

router.get('/:location', cors(), (req, res) => {
  console.log(`GET /${req.params.location}`);
  const location = parseLocationParameter(req.params.location);

  query({
    geometry: {
      $near: {
        $maxDistance: 1000,
        $geometry: {
          type: 'Point',
          coordinates: location,
        },
      },
    },
  })
    .then((buildings) => {
      res.json(buildings);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

const parseLocationParameter = (locationString) => {
  // "@51.47552,-2.60833" ==> [-2.60833, 51.47552]
  return locationString
    .substring(1)
    .split(',')
    .map((datum) => parseFloat(datum))
    .reverse();
};
