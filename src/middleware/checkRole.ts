import { Request, Response, NextFunction } from "express";

export const authorizeRole = (role:string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req?.user?.role !== role) {
      res.status(400).json({ message: `Only ${role} can access this route` });
      return;
    }
    next();
  };
};
