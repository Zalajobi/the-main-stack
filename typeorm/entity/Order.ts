import {Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn} from "typeorm";
import {OrderItem} from "./OrderItem";

@Entity()
export class Order {
  @ObjectIdColumn()
  id: ObjectId;

  @ObjectIdColumn()
  userId: ObjectId;

  @Column(() => OrderItem)
  items: OrderItem[];

  @Column()
  totalAmount: number;

  @Column()
  status: string;

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}