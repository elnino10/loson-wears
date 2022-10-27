/* eslint-disable no-undef */
import app from './app.js';
import dotenv from "dotenv";
import config from "./config.js";
import mongoose from "mongoose"; 

process.on("uncaughtException", (err) => {
  console.log("Error! Shutting down..");
  console.log(err.name, err.message);
  process.exit(1);
});
 
dotenv.config();

const mongodbUrl = config.MONGODB_URL.replace('<password>', config.DATABASE_PASSWORD);
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connected...");
  });

const port = config.SERVER_PORT

const server = app.listen(port, () => {
  console.log(`server started at port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("Error! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
