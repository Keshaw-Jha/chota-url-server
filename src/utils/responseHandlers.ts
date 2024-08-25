import { HttpStatusCode } from "axios";
import { Response } from "express";

export const sendSuccessResponse = (
  res: Response,
  data: any,
  statusCode = HttpStatusCode.Ok
) => {
  res.status(statusCode).json({ status: "success", data });
};

export const sendErrorResponse = (
  res: Response,
  errorMessage: String,
  statusCode = HttpStatusCode.BadRequest
) => {
  res.status(statusCode).json({ status: "fail", errorMessage });
};
