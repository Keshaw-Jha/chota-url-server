import { Router } from "express";
import { addNewUrl, getAllUrls } from "../handlers/url-handlers.ts";
// import { getAllUrls } from "../helpers/helper-functions.ts";

const UrlRouter = Router();

UrlRouter.get("/get-all-urls", getAllUrls);
UrlRouter.post("/add-url", addNewUrl);
UrlRouter.get("/get-url/:id", () => {});
UrlRouter.put("/update-url/:id", () => {});
UrlRouter.delete("/delete-url/:id", () => {});

export default UrlRouter;
