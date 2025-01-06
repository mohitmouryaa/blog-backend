import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { jwtTokenData } from "../schemas/jwtSchema";

export const generateJwtToken = (data: jwtTokenData): JwtPayload | string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  let token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "12h" });
  return token;
};

export const verifyJwtToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }
  if (!token) {
    res.status(401).json({ message: "Unauthorized: Invalid token format" });
    return;
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded as jwtTokenData;

  next();
};
