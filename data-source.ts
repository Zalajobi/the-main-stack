import { DataSource } from "typeorm";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PORT } from "./util/config";
import { Product } from "./typeorm/entity/Product";
import { Brand } from "./typeorm/entity/Brand";
import { User } from "./typeorm/entity/User";
import { Cart } from "./typeorm/entity/Cart";
import { SellerDetails } from "./typeorm/entity/SellerDetails";
import { CartItems } from "./typeorm/entity/CartItems";
import { Order } from "./typeorm/entity/Order";
import { OrderItem } from "./typeorm/entity/OrderItem";

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: DATABASE_HOST,
  port: Number(DATABASE_PORT),
  database: DATABASE_NAME,
  entities: [
    Brand,
    Cart,
    CartItems,
    Order,
    OrderItem,
    Product,
    SellerDetails,
    User,
  ],
  synchronize: true,
  subscribers: [],
});
