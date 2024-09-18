import { SellerSignupRequestSchema } from "../schema/userSchemas";
import { sellerDetailsRepository } from "../typeorm/repositories";
import { DefaultJsonResponse } from "../lib/responses";
import { DefaultFunctionResponse } from "../types/index.types";
import { ObjectId } from "typeorm";
import { updateUserDetailsByUserId } from "./userStore";
import { SellerDetails } from "../typeorm/entity/SellerDetails";

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
