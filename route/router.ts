import { Router } from "express";
import { BASE_URL } from "../util/config";
import { JsonApiResponse } from "../lib/responses";
import userRouter from "./userRequestHandler";
import sellerRouter from "./sellerRequestHandler";

const rootRouter = Router();

rootRouter.get(BASE_URL, (_req, res) => {
  JsonApiResponse(res, "Health Check", true, null, 200);
});

rootRouter.use(`${BASE_URL}/user`, userRouter);
rootRouter.use(`${BASE_URL}/seller`, sellerRouter);

export default rootRouter;
