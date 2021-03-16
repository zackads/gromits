import { mongoose, Schema } from 'mongoose';

const express = require('express');
const app = express();
const port = 80;

mongoose.connect('mongodb://localhost', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));

const SomeModelSchema = new Schema({
  a_string: String,
  a_date: Date,
});

const BuildingModel = mongoose.model('SomeModel', SomeModelSchema);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
