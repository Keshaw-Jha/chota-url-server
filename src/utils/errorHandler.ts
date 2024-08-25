import { Request, Response, NextFunction } from "express";

// Centralized error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
};
