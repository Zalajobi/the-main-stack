import {SellerSignupRequestSchema} from "../schema/userSchemas";
import {sellerDetailsRepository} from "../typeorm/repositories";
import {DefaultJsonResponse} from "../lib/responses";
import {DefaultFunctionResponse} from "../types/index.types";
import {ObjectId} from "typeorm";
import {updateUserDetailsByUserId} from "./userStore";
import {SellerDetails} from "../typeorm/entity/SellerDetails";

export const createNewSellerDetails = async (
  data: SellerSignupRequestSchema,
  id: ObjectId,
): Promise<DefaultFunctionResponse> => {
  const sellerDetailsRepo = sellerDetailsRepository();

  const isUnique = await sellerDetailsRepo.count({
    where: {
      storeName: data.storeName,
    },
  });

  if (isUnique > 0) {
    return DefaultJsonResponse("Store name already exists", null, false);
  }

  const sellerDetails = new SellerDetails();
  sellerDetails.storeDescription = data.storeDescription;
  sellerDetails.storeName = data.storeName;

  const newSellerDetails = await sellerDetailsRepo.save(sellerDetails);

  if (!newSellerDetails)
    return DefaultJsonResponse("Failed to create store", null, false);

  const { success } = await updateUserDetailsByUserId(
    { isSeller: true, sellerDetails: newSellerDetails },
    id,
  );
  if (!success) {
    return DefaultJsonResponse(
      "Failed to update user seller status",
      null,
      false,
    );
  }

  return DefaultJsonResponse("Seller Registration Successful", null, true);
};

export const updateSellerDetailsById = async (
  data: Record<string, any>,
  sellerId: ObjectId,
): Promise<DefaultFunctionResponse> => {
  const sellerDetailsRepo = sellerDetailsRepository();

  const updatedSeller = await sellerDetailsRepo.update(sellerId, data);

  return DefaultJsonResponse(
    updatedSeller ? "Seller details updated" : "Seller details not updated",
    null,
    !!updatedSeller.affected,
  );
};

export const getSellerDetailsById = async (sellerId: ObjectId) => {
  const sellerDetailsRepo = sellerDetailsRepository();

  return await sellerDetailsRepo.findOne({
    where: {
      _id: sellerId,
    }
  });
}
