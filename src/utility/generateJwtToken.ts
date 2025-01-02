import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtTokenData } from "../schemas/jwtSchema";

export const generateJwtToken = (data: jwtTokenData): JwtPayload | string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  let token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "12h" });
  return token;
};