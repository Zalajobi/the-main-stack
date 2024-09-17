import {Router} from "express";
import {BASE_URL} from "../util/config";

const rootRouter = Router();

rootRouter.get(BASE_URL, (_req, res) => {
  res.send("Health Check");
});

export default rootRouter;