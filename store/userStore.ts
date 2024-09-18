import { userRepository } from "../typeorm/repositories";
import { DefaultJsonResponse } from "../lib/responses";
import { DefaultFunctionResponse } from "../types/index.types";
import { ObjectId } from "typeorm";

export const getUserDataByEmail = async (
  email: string,
): Promise<DefaultFunctionResponse> => {
  const userRepo = userRepository();

  const userData = await userRepo.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });

  return DefaultJsonResponse(
    userData ? "User found" : "User not found",
    userData,
    !!userData,
  );
};

export const updateUserDetailsByUserId = async (
  data: Record<string, any>,
  userId: ObjectId,
): Promise<DefaultFunctionResponse> => {
  const userRepo = userRepository();

  const updatedUser = await userRepo.update(userId, data);

  return DefaultJsonResponse(
    updatedUser.affected ? "User updated" : "User not updated",
    null,
    !!updatedUser.affected,
  );
};

