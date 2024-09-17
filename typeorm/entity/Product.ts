import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Product {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  images: string[];

  @Column()
  category: string;

  @Column()
  stock: number;

  @ObjectIdColumn({
    name: "sellerId"
  })
  sellerId: ObjectId;

  @ObjectIdColumn({
    name: "objectId",
  })
  brandId: ObjectId;

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}