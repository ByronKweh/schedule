import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { scheduleRouter } from "./routes/schedule";
import { blogRouter } from "./routes/blog";
require("dotenv").config();
const cors = require("cors");

const app = express();

if (!process.env.MONGO_URL) {
  throw new Error("ENV NOT FOUND");
  //TODO use a proper env library
}

mongoose
  .connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("connected to database");
    }
  )
  .catch((e) => console.log(`failed to connect to database :${e.message}`));

const allowedOrigins = ["http://localhost:3001"];

const corsOptions = {
  origin: function (origin: string, callback: Function) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(json());
app.use(scheduleRouter);
app.use(blogRouter);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
