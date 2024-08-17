import express, { json, urlencoded } from "express";
import UrlRouter from "./routes/url.ts";
import { getAll } from "./helpers/helper-functions.ts";
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api", UrlRouter);

app.get("", (req, res) => {
  res.status(200).json({ msg: "Server is up and running" });
});

export default app;
