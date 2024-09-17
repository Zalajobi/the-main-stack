import {userRepository} from "../typeorm/repositories";
import {DefaultJsonResponse} from "../lib/responses";

export const getUserDataByEmail = async (email: string) => {
  const userRepo = userRepository();

  const userData = await userRepo.findOne({
    where: {
      email: email.toLowerCase(),
    }
  })

  return DefaultJsonResponse(userData ? "User found" : "User not found", userData, !!userData);
}