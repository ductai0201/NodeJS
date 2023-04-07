import express from "express";
import productRouter from "./routers/product";
import categoryRouter from "./routers/category";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routers/auth";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", productRouter);
app.use("/api", categoryRouter);
app.use("/api", authRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/Assignment2")
  .then(console.log("Connect success"));

export const viteNodeApp = app;
