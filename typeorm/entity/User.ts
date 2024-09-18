import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { SellerDetails } from "./SellerDetails";

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({
    name: "firstName",
    nullable: false,
  })
  firstName: string;

  @Column({
    name: "firstName",
    nullable: false,
  })
  lastName: string;

  @Column({
    name: "email",
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: "password",
    nullable: false,
  })
  password: string;

  @Column({
    name: "dob",
    nullable: true,
    type: "timestamp",
  })
  dob: Date;

  @Column({
    nullable: true,
    name: "profilePic",
  })
  profilePic?: string;

  @Column({
    name: "isSeller",
    default: false,
  })
  isSeller: boolean;

  @Column({
    nullable: true,
    name: "sellerDetails",
  })
  sellerDetails?: SellerDetails;

  @Column(() => Cart)
  cart: Cart;

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;
}
