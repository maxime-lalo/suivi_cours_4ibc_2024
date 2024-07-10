import dotenv from "dotenv";
import express, { Router } from "express";
import api from "../http/api";
import bodyParser from "body-parser";
import cookiesParser from "cookie-parser";
import ErrorHandler from "../http/middlewares/ErrorHandler";
// npm i --save-dev @types/cookie-parser
// npm i cookie-parser

dotenv.config();

const app = express();
// npm i body-parser
app.use(
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json(),
  cookiesParser()
);
const subRouter: Router = express.Router();
app.use("/", subRouter);
api(subRouter);

app.use(ErrorHandler);

app
  .listen(process.env.PORT, () => {
    console.log("Server running at port : ", process.env.PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });

// npm i prisma --save-dev
// npx prisma init --datasource-provider postgresql
// npx prisma migrate dev
// npx prisma studio

// en cas de conflits :
// npx prisma migrate dev --create-only l