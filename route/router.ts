import {Router} from "express";
import {BASE_URL} from "../util/config";
import {JsonApiResponse} from "../lib/responses";

const rootRouter = Router();

rootRouter.get(BASE_URL, (_req, res) => {
  JsonApiResponse(res, "Health Check", true, null, 200);
});

export default rootRouter;