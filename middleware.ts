import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.status || 500;
  const errorMessages =  err.message || "Internal serve Error";

   res.status(errorStatus).json({ message: errorMessages, success: false });
};
