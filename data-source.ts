import {DataSource} from "typeorm";
import {DATABASE_HOST, DATABASE_NAME, DATABASE_PORT} from "./util/config";
import {Product} from "./typeorm/entity/Product";
import {Brand} from "./typeorm/entity/Brand";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  database: DATABASE_NAME,
  entities: [
    Product,
    Brand
  ],
  synchronize: true,
  subscribers: [],
})
