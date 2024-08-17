import { NextFunction, Request, Response } from "express";

import {
  addNew,
  generateRandomString,
  getAll,
  getByParam,
} from "../helpers/helper-functions.ts";
import { SHORT_URL_LENGTH } from "../utils/default-consts.ts";
import { UrlData } from "../models/url-table-data.ts";
import { v4 as uuid } from "uuid";

export interface ReturnData {
  name: string;
}

export const getAllUrls = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAll();
    if (result) res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const addNewUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tempShortUrl = uuid();
    const body = req.body as UrlData;
    const isExisting = await getByParam("originalUrl", body.originalUrl);
    if (!isExisting) {
      res
        .status(400)
        .json({ status: "fail", errorMessage: "row already exists" });
    } else {
      const result = await addNew({ ...body, shortUrl: tempShortUrl });
      res.status(201).send({ data: result });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
