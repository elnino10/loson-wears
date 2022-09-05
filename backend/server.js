import express from "express";
import data from "./data";
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRoute from "./routes/userRoute";

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
console.log(config.MONGODB_URL);
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connected.....");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(bodyParser.json());
app.use("/api/users", userRoute);

const { items } = data;
app.get("/api/items/:id", (req, res) => {
  const itemId = req.params["id"];
  const item = items.find((item) => item.id === itemId);
  if (item) {
    res.send(item);
  } else {
    res.status(404).send({ msg: "Product not found!" });
  }
});

app.get("/api/items", (req, res) => {
  res.send(items);
});

app.listen(5000, () => {
  console.log("server started at port 5000");
});
