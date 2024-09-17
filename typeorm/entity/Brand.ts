import {Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn} from "typeorm";
import {Product} from "./Product";

@Entity()
export class Brand {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  country: string;

  @Column(() => Product)
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;
}