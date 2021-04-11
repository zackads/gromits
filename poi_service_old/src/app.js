import express from 'express';
import { router } from './routes';
import { init } from './db';

const app = express();
const serverless = require('serverless-http');

app.use(router);

const PORT = process.env.PORT || 8080;

init().then(() => {
  console.log('Connected to database');
  app.listen(PORT);
  console.log(`Listening on port ${PORT}`);
});

module.exports.handler = serverless(app);
