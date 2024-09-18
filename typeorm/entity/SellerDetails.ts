import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
} from "typeorm";
import { Brand } from "./Brand";

@Entity({
  name: "sellerDetails",
})
export class SellerDetails {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({
    unique: true,
  })
  storeName: string;

  @Column()
  storeDescription: string;

  @Column(() => Brand)
  brands: Brand[];

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;
}
