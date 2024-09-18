import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from "typeorm";
import { Product } from "./Product";
import { CartItems } from "./CartItems";

@Entity()
export class Cart {
  @ObjectIdColumn()
  id: ObjectId;

  @Column(() => Product)
  products: Product[];

  @Column(() => CartItems)
  items: CartItems[];

  @ObjectIdColumn()
  userId: ObjectId;

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;
}
