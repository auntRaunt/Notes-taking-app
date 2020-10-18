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

const db = require("./database");

app.get("/", (req, res) => {
  res.render("login", { layout: "main2" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body);
  //check whether the username is correct
  db("accounts")
    .where("username", username)
    .then((data) => {
      if (data !== null) {
        const pw = data[0].password;
        if (pw === password) {
          res.redirect(`/note/${username}`);
        }
      }
    });
});

app.get("/register", (req, res) => {
  res.render("register", { layout: "main2" });
});

app.post("/register", (req, res) => {
  //Add the username and password into "account" table
  db.insert({ username: req.body.username, password: req.body.password })
    .into("accounts")
    .then(() => {
      res.redirect(`/note/${req.body.username}`);
    });
});

app.listen(port, () => {
  console.log("App is running at port " + port);
});
