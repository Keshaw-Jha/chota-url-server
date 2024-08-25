import { Router } from "express";
import {
  addNewUrl,
  getAllUrls,
  getUrlById,
  updateUrl,
} from "../handlers/url-handlers.ts";
import { getByParam, updateUrlHelper } from "../helpers/helper-functions.ts";
// import { getAllUrls } from "../helpers/helper-functions.ts";

const UrlRouter = Router();

UrlRouter.get("/get-all-urls", getAllUrls);
UrlRouter.post("/add-url", addNewUrl);
UrlRouter.get("/get-url/:id", getUrlById);
UrlRouter.put("/update-url", updateUrl);
UrlRouter.delete("/delete-url/:id", () => {});

export default UrlRouter;
