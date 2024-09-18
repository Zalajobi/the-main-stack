import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from "typeorm";

@Entity({
  name: "cartItems",
})
export class CartItems {
  @ObjectIdColumn()
  productId: ObjectId;

  @Column()
  quantity: number;

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;
}
