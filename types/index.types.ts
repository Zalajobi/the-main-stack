import { ObjectId } from "typeorm";

export type JWTDataProperties = {
  id: ObjectId;
  email: string;
  isSeller: boolean;
  iat?: number;
  exp?: number;
};
