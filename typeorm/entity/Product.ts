import {Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn} from "typeorm";

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
  image: string;

  @Column()
  category: string;

  @Column()
  stock: number;

  @Column()
  rating: number;

  @Column()
  reviewCount: number;

  // @ts-ignore
  @Column()
  brand: string;

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}