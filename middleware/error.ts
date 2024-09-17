import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { JsonApiResponse } from "../lib/responses";

export const errorMiddleware = async (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Schema Validation Error - Zod Error
  if (err instanceof ZodError) {
    return JsonApiResponse(res, "Schema Validation Error", false, null, 400, {
      type: "validation_error",
      message: "Validation error",
      errors: err.format(),
      name: err.name,
    });
  }

  // JWT Error
  if (err instanceof JsonWebTokenError) {
    return JsonApiResponse(res, "JWT Token Error", false, null, 401, {
      type: "jwt_error",
      message: err.message,
      name: err.name,
    });
  }

  // Badly Formed JSON Error From Post request
  if (err instanceof SyntaxError && "body" in err) {
    JsonApiResponse(res, "Bad JSON", false, null, 400, {
      type: "bad_json",
      message: err.message,
      name: err.name,
    });
    return;
  }

  // JWT TOKEN Expired Error
  if (err instanceof TokenExpiredError) {
    return JsonApiResponse(res, "Token Expired", false, null, 401, {
      type: "jwt_error",
      message: "Token Expired",
      name: err.name,
    });
  }

  // Generic Error
  if (err instanceof Error) {
    JsonApiResponse(res, "Error", false, null, 500, {
      type: "api_error",
      message: err.message,
      name: err.name,
    });
    return;
  }
};
