import { NextFunction, Request, Response } from "express";
import { JsonApiResponse } from "../lib/responses";
import redisClient from "../lib/redis";
import jwtClient from "../lib/jwt";
import { bearerTokenSchema } from "../schema/commonSchamas";
import {
  ACCESS_TOKEN_HEADER_NAME,
  FIVE_MINUTE_MILLISECONDS,
} from "../util/constants";

export const authorizeRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const whitelistedEndpoints = ["/auth/login"];
  console.log(req.url);

  if (whitelistedEndpoints.some((whitelist) => req.url.includes(whitelist))) {
    return next();
  }

  const { authorization: accessToken } = bearerTokenSchema.parse(req.headers);
  if (!accessToken) {
    return JsonApiResponse(res, "Not Authorized", false, null, 401);
  }

  try {
    const { iat, exp, ...tokenUser } = jwtClient.verifyJSONToken(
      accessToken,
      false,
    );

    if (tokenUser) {
      const remainingTime = Number(exp) * 1000 - Date.now();

      if (remainingTime < FIVE_MINUTE_MILLISECONDS) {
        console.log("Remaining time less than 5 minutes");
        const refreshToken = await redisClient.getRedisKey(
          JSON.stringify(tokenUser?.id),
        );
        const verifiedRefreshToken = jwtClient.verifyJSONToken(
          refreshToken as string,
          true,
        );

        if (verifiedRefreshToken) {
          const { exp, iat, ...tokenPayload } = verifiedRefreshToken;
          const newAccessToken = jwtClient.generateJWTAccessToken(tokenPayload);

          res.setHeader(ACCESS_TOKEN_HEADER_NAME, newAccessToken);
        } else {
          return JsonApiResponse(res, "Not Authorized", false, null, 401);
        }
      }
    } else {
      return JsonApiResponse(res, "Not Authorized", false, null, 401);
    }
  } catch (error) {
    next(error);
  }

  next();
};
