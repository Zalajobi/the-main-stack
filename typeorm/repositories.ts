import { AppDataSource } from "../data-source";
import { Product } from "./entity/Product";
import { Brand } from "./entity/Brand";
import { Cart } from "./entity/Cart";
import { User } from "./entity/User";
import { CartItems } from "./entity/CartItems";
import { Order } from "./entity/Order";
import { OrderItem } from "./entity/OrderItem";
import { SellerDetails } from "./entity/SellerDetails";

export const productRepository = () => {
  return AppDataSource.getMongoRepository(Product);
};

export const brandRepository = () => {
  return AppDataSource.getMongoRepository(Brand);
};

export const cartRepository = () => {
  return AppDataSource.getMongoRepository(Cart);
};

export const userRepository = () => {
  return AppDataSource.getMongoRepository(User);
};

export const cartItemsRepository = () => {
  return AppDataSource.getMongoRepository(CartItems);
};

export const orderRepository = () => {
  return AppDataSource.getMongoRepository(Order);
};

export const orderItemRepository = () => {
  return AppDataSource.getMongoRepository(OrderItem);
};

export const sellerDetailsRepository = () => {
  return AppDataSource.getMongoRepository(SellerDetails);
};
