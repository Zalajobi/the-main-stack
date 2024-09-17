import {Column, CreateDateColumn, Entity} from "typeorm";
import {Brand} from "./Brand";

@Entity({
  name: "sellerDetails"
})
export class SellerDetails {
  @Column()
  storeName: string;

  @Column()
  storeDescription: string;

  @Column(() => Brand)
  brands: Brand[];

  @CreateDateColumn({
    name: "createdAt",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  createdAt: Date;
}
