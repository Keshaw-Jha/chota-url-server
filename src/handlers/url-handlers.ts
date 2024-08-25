import { Request, Response } from "express";

import {
  addNew,
  getAll,
  getByParam,
  updateUrlHelper,
} from "../helpers/helper-functions.ts";
import { UrlData } from "../models/url-table-data.ts";
import { v4 as uuid } from "uuid";
import { HttpStatusCode } from "axios";
import { asyncHandler } from "../utils/asyncHandler.ts";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHandlers.ts";

export interface ReturnData {
  name: string;
}

export const getAllUrls = asyncHandler(async (req: Request, res: Response) => {
  const result = await getAll();
  return sendSuccessResponse(res, result);
});

export const addNewUrl = asyncHandler(async (req: Request, res: Response) => {
  const tempShortUrl = uuid();
  const body = req.body as UrlData;
  const isExisting = await getByParam("originalUrl", body.originalUrl);
  if (isExisting) {
    return sendErrorResponse(res, "row already exists");
  } else {
    const result = await addNew({ ...body, shortUrl: tempShortUrl });
    return sendSuccessResponse(res, result, HttpStatusCode.Created);
  }
});

export const getUrlById = asyncHandler(async (req: Request, res: Response) => {
  const result = await getByParam("id", req.params.id);
  if (Array.isArray(result) && result.length) {
    return sendSuccessResponse(res, result);
  } else {
    return sendErrorResponse(res, "No such id exists", HttpStatusCode.NotFound);
  }
});

export const updateUrl = asyncHandler(async (req: Request, res: Response) => {
  const tempUrl = req.body as UrlData;
  const result = await updateUrlHelper(tempUrl);
  if (!result.length)
    return sendErrorResponse(res, "No such url found", HttpStatusCode.NotFound);
  return sendSuccessResponse(res, result);
});
