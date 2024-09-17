import * as process from "node:process";

export const BASE_URL = process.env.BASE_URL!;

export const DATABASE_HOST = process.env.DATABASE_HOST!;

export const DATABASE_PORT = process.env.DATABASE_PORT!;

export const DATABASE_NAME = process.env.DATABASE_NAME!;

export const PASSWORD_HASH_SECRET = process.env.PASSWORD_HASH_SECRET!;

export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN!;

export const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN!;

export const REDIS_HOST = process.env.REDIS_HOST!;

export const REDIS_PORT = process.env.REDIS_PORT!;

export const REDIS_PASSWORD = process.env.REDIS_PASSWORD!;
