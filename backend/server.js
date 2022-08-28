import express from "express";
import data from "./data";

const app = express();

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
