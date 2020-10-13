require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const hb = require("express-handlebars");
const noteRoute = require("./router/note/note");

const port = process.env.PORT || 3000;

app.engine("handlebars", hb({ defaultLayout: "main" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use("/note", noteRoute);

app.get("/", (req, res) => {
  res.render("showNote-db");
});

app.listen(port, () => {
  console.log("App is running at port " + port);
});
