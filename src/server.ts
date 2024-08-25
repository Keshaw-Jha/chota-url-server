import express, { json, urlencoded } from "express";
import UrlRouter from "./routes/url.ts";
import { errorHandler } from "./utils/ErrorHandler.ts";
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api", UrlRouter);

app.use(errorHandler);

app.get("", (req, res) => {
  res.status(200).json({ msg: "Server is up and running" });
});

export default app;
