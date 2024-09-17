import { Response } from "express";

export const JsonApiResponse = (
  res: Response,
  message: string,
  success: boolean,
  data: Record<string, any> | Record<string, any>[] | null,
  statusCode: number,
  error?: Record<string, any>,
) => {
  res.send({
    message,
    success,
    data,
    error,
  }).status(statusCode);
};
