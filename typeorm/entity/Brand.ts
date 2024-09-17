import {Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn} from "typeorm";

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

  @Column()
  state: string;

  @Column()
  address: string;

  @ObjectIdColumn({
    name: "sellerId"
  })
  sellerId: ObjectId;

  @Column("array")
  products: ObjectId[];

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}