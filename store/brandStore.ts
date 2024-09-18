import {RegisterBrandRequestSchema} from "../schema/sellerSchemas";
import {DefaultFunctionResponse} from "../types/index.types";
import { brandRepository } from "../typeorm/repositories";
import {Brand} from "../typeorm/entity/Brand";
import {getSellerDetailsById, updateSellerDetailsById} from "./sellerDetailsStore";
import {SellerDetails} from "../typeorm/entity/SellerDetails";

export const sellerCreatesNewBrand = async (data: RegisterBrandRequestSchema, user: Record<string, any>): Promise<DefaultFunctionResponse> => {
  const brandRepo = brandRepository();

  if (!user.sellerDetails) {
    return {
      success: false,
      message: "Seller details not found",
      data: null
    }
  }

  const brand = new Brand();
  brand.sellerId = user.sellerDetails.id;
  brand.country = data.country;
  brand.description = data.description;
  brand.image = data.image;
  brand.name = data.name;
  brand.state = data.state;
  brand.address = data.address;
  brand.products = [];
  const newBrand = await brandRepo.save(brand);

  if (!newBrand) {
    return {
      success: false,
      message: "Brand not created",
      data: null
    }
  }

  // get seller and push to brands array
  const seller = await getSellerDetailsById(user.sellerDetails.id);
  if (seller && !seller.brands) {
    seller.brands = [];
  }
  seller?.brands.push(newBrand);
  await updateSellerDetailsById(seller as SellerDetails, user.sellerDetails.id);

  return {
    success: true,
    message: "Brand successfully registered",
    data: newBrand
  }
}