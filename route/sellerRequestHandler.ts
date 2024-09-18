import {NextFunction, Request, Response, Router} from "express";
import {JsonApiResponse} from "../lib/responses";
import {RegisterBrandRequestSchema} from "../schema/sellerSchemas";

const sellerRouter = Router();

sellerRouter.post('/register-brand', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = RegisterBrandRequestSchema.parse({
      ...req.body,
      ...req.headers,
    })

    JsonApiResponse(res, "Brand registered successfully", true, payload, 200);
  } catch (error) {
    next(error);
  }
})

export default sellerRouter;
