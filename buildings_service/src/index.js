import express from 'express';
import mongoose from 'mongoose';
import { Building } from './models/building';

const app = express();
const port = 80;

mongoose.connect('mongodb://localhost', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.listen(port, () => {
  console.log('Listening at port 80...');
});

app.get('/buildings', (req, res) => {
  return Building.find((err, buildings) => res.send({ points: buildings }));
});
