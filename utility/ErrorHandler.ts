import { Response } from "express";
import { z } from "zod";

export const ErrorHandler = (error: unknown, res: Response): void => {
  console.log("i m here");
  console.log("error are",error);
  if (error instanceof z.ZodError) {
    const errors = error.errors;
    // const errorMessages = errors?.map((item) => ({ error: item.message }));
    res.status(400).json({ message: "Validation Error", success: false, error:errors });
    return;
  }

  console.error(error);
  res.status(400).json({ message: "Internal Server Error", success: false });
  return;
};

