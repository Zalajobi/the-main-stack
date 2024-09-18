import { NextFunction, Request, Response, Router } from "express";
import { LoginRequestSchema } from "../schema/commonSchamas";
import { JsonApiResponse } from "../lib/responses";
import { getUserDataByEmail } from "../store/userStore";
import cryptoClient from "../lib/crypto";
import jwtClient from "../lib/jwt";
import redisClient from "../lib/redis";
import {
  ACCESS_TOKEN_HEADER_NAME,
  TWENTY_FOUR_HOURS_SECONDS,
} from "../util/constants";
import { SellerSignupRequestSchema } from "../schema/userSchemas";
import { createNewSellerDetails } from "../store/sellerDetailsStore";

const userRouter = Router();

userRouter.post(
  "/auth/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = LoginRequestSchema.parse(req.body);

      const { data, success, message } = await getUserDataByEmail(
        payload.email,
      );

      if (!success) {
        JsonApiResponse(res, message, false, null, 401);
      }

      if (cryptoClient.validatePassword(payload.password, data.password)) {
        const jwtPayload = {
          id: data?.id ?? "",
          email: data?.email ?? "",
          isSeller: data?.isSeller ?? false,
        };

        // Refresh and access token generation
        const accessToken = jwtClient.generateJWTAccessToken(jwtPayload);
        const refreshToken = jwtClient.generateJWTRefreshToken(jwtPayload);

        // Send Refresh Token to Redis
        await redisClient.setRedisKey(
          JSON.stringify(data.id),
          refreshToken,
          TWENTY_FOUR_HOURS_SECONDS,
        );

        res.setHeader(ACCESS_TOKEN_HEADER_NAME, accessToken);
        JsonApiResponse(res, "Login Successful", true, null, 200);
      }

      JsonApiResponse(res, "Incorrect Credentials", false, null, 401);
    } catch (error) {
      next(error);
    }
  },
);

userRouter.post(
  "/seller/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = SellerSignupRequestSchema.parse({
        ...req.body,
        ...req.headers,
      });

      const authUser = jwtClient.verifyJSONToken(payload.authorization, false);
      const { data, success, message } = await getUserDataByEmail(
        authUser.email,
      );

      if (!success) {
        return JsonApiResponse(res, message, false, null, 404);
      }

      if (data.isSeller) {
        return JsonApiResponse(
          res,
          "User is already a seller",
          false,
          null,
          400,
        );
      }

      const { success: storeSuccess, message: storeMessage } =
        await createNewSellerDetails(payload, data.id);

      JsonApiResponse(res, storeMessage, storeSuccess, null, 200);
    } catch (error) {
      next(error);
    }
  },
);

export default userRouter;
