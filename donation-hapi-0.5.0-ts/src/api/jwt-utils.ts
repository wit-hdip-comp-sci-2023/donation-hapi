import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "@hapi/hapi";
import dotenv from "dotenv";
import { db } from "../models/db.js";
import { User } from "../types/donation-types.js";

dotenv.config();
const cookiePassword = process.env.COOKIE_PASSWORD as string;

export function createToken(user: User) {
  const payload = {
    id: user._id,
    email: user.email,
    scope: [],
  };
  const options: jwt.SignOptions = {
    algorithm: "HS256",
    expiresIn: "1h",
  };
  return jwt.sign(payload, cookiePassword, options);
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.verify(token, cookiePassword) as jwt.JwtPayload;
    return {
      id: decoded.id,
      email: decoded.email,
      scope: decoded.scope,
    } as JwtPayload;
  } catch (e: any) {
    console.log(e.message);
  }
  return null;
}

export async function validate(decoded: JwtPayload): Promise<{ isValid: true; credentials: User } | { isValid: false }> {
  const user = (await db.userStore.findOne(decoded.id)) as User;
  if (user === null) {
    return { isValid: false };
  }
  return { isValid: true, credentials: user };
}

export function getUserIdFromRequest(request: Request) {
  let userId = null;
  try {
    const { authorization } = request.headers;
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secretpasswordnotrevealedtoanyone") as jwt.JwtPayload;
    userId = decodedToken.id;
  } catch (e) {
    userId = null;
  }
  return userId;
}
