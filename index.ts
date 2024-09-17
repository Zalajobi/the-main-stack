import express = require('express');
import cors = require('cors');

const app = express();

app.use(express.json({ limit: '200mb' })); // for parsing application/json not more than 200mb
app.use(express.urlencoded({ limit: '200mb', extended: true })); // for parsing application/x-www-form-urlencoded not more than 200mb
app.use(
  cors({
    origin: [
      'http://localhost:3000', // react App
      'http://localhost:5173', // Vite App
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Credentials',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Headers',
    ],
    exposedHeaders: ['X-Access-Token'], // for JWT
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.listen(process.env.PROJECT_PORT, () => {
  console.log(`Example app listening on port ${process.env.PROJECT_PORT}`);
});
