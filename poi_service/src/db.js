import { MongoClient } from 'mongodb';

const ENV = process.env.NODE_ENV;
const DB_URL = process.env.DB_URL;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const uri =
  ENV === 'development'
    ? `mongodb://${DB_URL}`
    : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}`;

const dbName = 'poi';
const collectionName = 'buildings';

let db;

export const init = () =>
  MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((client) => {
    db = client.db(dbName);
    db.collection(collectionName).createIndex({ geometry: '2dsphere' });
  });

export const query = (query) =>
  db.collection(collectionName).find(query).toArray();
