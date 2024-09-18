import {NextFunction, Request, Response, Router} from "express";
import {JsonApiResponse} from "../lib/responses";
import {RegisterBrandRequestSchema} from "../schema/sellerSchemas";
import jwtClient from "../lib/jwt";
import {sellerCreatesNewBrand} from "../store/brandStore";
import {getUserDataByEmail} from "../store/userStore";

const sellerRouter = Router();

sellerRouter.post('/register-brand', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = RegisterBrandRequestSchema.parse({
      ...req.body,
      ...req.headers,
    })

    const { email } = jwtClient.verifyJSONToken(payload.authorization, false);
    const { data: user } = await getUserDataByEmail(email);
    if (!user.isSeller) {
      return JsonApiResponse(res, "User is not a seller", false, null, 403);
    }

    const { success, message } = await sellerCreatesNewBrand(payload, user);

    return JsonApiResponse(res, message, success, null, 200);
  } catch (error) {
    next(error);
  }
})

export default sellerRouter;
