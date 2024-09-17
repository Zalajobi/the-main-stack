import {Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn} from "typeorm";

@Entity({
  name: "orderItem"
})
export class OrderItem {
  @ObjectIdColumn()
  productId: ObjectId;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}