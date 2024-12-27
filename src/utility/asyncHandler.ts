import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      console.log("Inside asyncHandler");  // Debug log
      Promise.resolve(fn(req, res, next)).catch((error) => {
        console.error("Error caught in asyncHandler: ", error);
        next(error)
    });
    };
  };
  