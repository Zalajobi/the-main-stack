import "dotenv/config";
import "module-alias/register";
import 'reflect-metadata';
import express = require('express');
import cors = require('cors');
import rootRouter from "./routes/router";
import {AppDataSource} from "./data-source";
import {DataSource} from "typeorm";

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

app.use("/", rootRouter);

AppDataSource.initialize().then(async (init: DataSource) => {
  console.log("Initialising TypeORM...");
  await init.runMigrations();
  console.log("Initialised TypeORM, Migration Successful...");

  // const product = new Product();
  // product.brand = "Apple";
  // product.name = "iPhone 13";
  // product.price = 999;
  // product.category = "Smartphone";
  // product.description = "The latest iPhone";
  // product.rating = 5;
  // product.reviewCount = 100;
  //
  // const newProduct = await productRepository().save(product)
  // console.log(newProduct);
})

app.listen(process.env.PROJECT_PORT, () => {
  console.log(`Example app listening on port ${process.env.PROJECT_PORT}`);
});
