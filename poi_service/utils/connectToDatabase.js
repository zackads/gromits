const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}`;

let cachedDb = null;

function connectToDatabase(uri = MONGODB_URI) {
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

module.exports = { connectToDatabase };
