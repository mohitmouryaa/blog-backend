import { Request, Response, NextFunction } from "express";

export const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "admin") {
     res.status(400).json({ message: "Only admin can access this route" });
     return;
  }
  next();
};

export const checkAuthor = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "author") {
    res.status(400).json({ message: "Only author can access this route" });
    return;
  }
  next();
};
