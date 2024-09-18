import { ObjectId } from "typeorm";

export type JWTDataProperties = {
  id: ObjectId;
  email: string;
  isSeller: boolean;
  iat?: number;
  exp?: number;
};

export type DefaultFunctionResponse = {
  message: string;
  data: any;
  success: boolean;
};
