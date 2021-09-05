require("dotenv").config();
import * as express from "express";
import * as bodyParser from "body-parser";
import modelsInit from "./models";
import UserAccountV1Routes from "./v1/user-account/router";
import cors from 'cors';

class App {
  public app: express.Application;

  constructor() {
    this.app = express.default();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(
      cors({
        origin: (process.env.CORS_ORIGIN || "http://localhost:3000").split(","),
      })
    );
    modelsInit();
  }

  public routes(): void {
    this.app.use("/api/v1/user-accounts", new UserAccountV1Routes().router);
  }
}

export default new App().app;
