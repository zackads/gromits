import { MongoClient } from 'mongodb';

const DB_URL = process.env.DB_URL;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}`;
console.log(uri);
const dbName = 'poi';
const collectionName = 'buildings';

let db;

export const init = () =>
  MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((client) => {
    db = client.db(dbName);
  });

export const query = (query) =>
  db.collection(collectionName).find(query).toArray();
