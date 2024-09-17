import { NextFunction, Request, Response } from "express";

// Note - Not Functional for the changed use-case
export const authorizeRequest = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    // Middleware implementation
    console.log(req.url)
  } catch (error) {
    next(error);
  }

  next();
};
