import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import config from "../config/config.global";
import routes from "../routes/index";
import {
  handle404Error,
  handle422Error,
  handleError,
} from "../middlewares/error-handler.middleware";

export default ({ app }: { app: Application }) => {
  app.enable("trust proxy");

  app.use(cors());

  app.use(express.json());

  app.use(morgan("dev"));

  // Load API routes
  app.use(`${config.api.prefix}${config.api.version}`, routes());

  // catch 422 Error and forward to error handler
  app.use(handle422Error);

  // catch 404 Error
  app.use(handle404Error);

  // catch other Errors
  app.use(handleError);
};
