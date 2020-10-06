require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const hb = require("express-handlebars");
const mongoose = require("mongoose");
const fs = require("fs");

const port = process.env.PORT || 3000;

app.engine("handlebars", hb({ defaultLayout: "main" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

const datas = {
  data: [],
};

app.get("/", (req, res) => {
  if (datas.data === []) {
    res.render("note");
  } else {
    res.render("showNote", datas);
  }
});

app.post("/", (req, res) => {
  datas.data.push({ title: req.body.title, content: req.body.content });

  console.log(datas);

  res.render("showNote", datas);
});

app.post("/delete", (req, res) => {
  //1. find the delete item name in client side
  //2. remove that item in the global array
  const deleteItemName = req.body.itemName;
  //   console.log(`deleteItem = ${deleteItemName}`);
  let modifiedData = datas.data.filter((item) => {
    return item.title !== deleteItemName;
  });

  datas.data = modifiedData;
  res.render("showNote", datas);
  res.redirect("/");
});

app.listen(port, () => {
  console.log("App is running at port" + port);
});
