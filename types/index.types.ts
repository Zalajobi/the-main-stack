import {ObjectId} from "typeorm";

export type JWTDataProperties = {
  id: ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  isSeller: boolean;
  iat?: number;
  exp?: number;
};
