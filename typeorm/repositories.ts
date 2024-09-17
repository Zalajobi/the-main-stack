import {AppDataSource} from "../data-source";
import {Product} from "./entity/Product";
import {Brand} from "./entity/Brand";

export const productRepository = () => {
  return AppDataSource.getMongoRepository(Product);
}

export const brandRepository = () => {
  return AppDataSource.getMongoRepository(Brand);
}
