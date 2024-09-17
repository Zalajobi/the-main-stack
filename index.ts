import "dotenv/config";
import "module-alias/register";
import 'reflect-metadata';
import express = require('express');
import cors = require('cors');
import rootRouter from "./route/router";
import {AppDataSource} from "./data-source";
import {DataSource} from "typeorm";
import {authorizeRequest} from "./middleware/auth";
import {User} from "./typeorm/entity/User";
import cryptoClient from "./lib/crypto";
import {errorMiddleware} from "./middleware/error";

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

app.use(authorizeRequest);
app.use("/", rootRouter);
app.use(errorMiddleware);

AppDataSource.initialize().then(async (init: DataSource) => {
  console.log("Initialising TypeORM...");
  await init.runMigrations();
  console.log("Initialised TypeORM, Migration Successful...");

  const user = new User();
  user.email = "zalajobi@gmail.com";
  user.firstName = "Zhikrullah";
  user.lastName = "IGBALAJOBI";
  user.password = cryptoClient.generatePasswordHash("password");
  user.dob = new Date("1995-01-01");

  // const newUser = await userRepository().save(user);
  // console.log(newUser)
})

app.listen(process.env.PROJECT_PORT, () => {
  console.log(`Example app listening on port ${process.env.PROJECT_PORT}`);
});
