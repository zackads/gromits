import express from 'express';
import mongoose from 'mongoose';
import { Building } from './models/building';

const cors = require('cors');

const app = express();
const DB_HOSTNAME = process.env.DB_HOSTNAME;
const SERVICE_PORT = 8875;

mongoose.connect(`mongodb://${DB_HOSTNAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.listen(SERVICE_PORT, () => {
  console.log(`Listening at port ${SERVICE_PORT}...`);
});

app.get('/buildings', cors(), (req, res) => {
  return Building.find((err, buildings) => res.send({ points: buildings }));
});
