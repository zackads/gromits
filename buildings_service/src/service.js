import express from 'express';
import mongoose from 'mongoose';
import { Building } from './models/building';

const app = express();
const PORT = 8875;

mongoose.connect('mongodb://localhost', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log('hello world!');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}...`);
});

app.get('/buildings', (req, res) => {
  return Building.find((err, buildings) => res.send({ points: buildings }));
});
