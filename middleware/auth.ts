import { NextFunction, Request, Response } from "express";

// Note - Not Functional for the changed use-case
export const authorizeRequest = async (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    // Middleware implementation
  } catch (error) {
    next(error);
  }

  next();
};
