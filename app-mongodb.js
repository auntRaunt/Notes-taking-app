require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const hb = require("express-handlebars");
const mongoose = require("mongoose");
const noteRoute = require("./router/note/note");

const port = process.env.PORT || 3000;

app.engine("handlebars", hb({ defaultLayout: "main" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use("/note", noteRoute);

//connect to mongodb
mongoose.connect("mongodb://localhost:27017/notesDB", {
  useNewUrlParser: true,
});

const noteSchema = {
  title: String,
  content: String,
};

const Notes = new mongoose.model("Notes", noteSchema);

app.get("/", (req, res) => {
  //not work
  // Notes.find({}, function (err, foundItems) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log(foundItems);
  //     res.render("showNote-db", { items: foundItems });
  //   }
  // });

  //work
  Notes.find({})
    .lean()
    .exec(function (err, body) {
      if (err) {
        console.log(err);
      } else {
        console.log(body);
        res.render("showNote-db", { items: body });
      }
    });
});

app.post("/", (req, res) => {
  const newNote = new Notes({
    title: req.body.title,
    content: req.body.content,
  });

  newNote.save(function (err) {
    if (err) {
      console.log(err);
    }
  });

  res.redirect("/");
  //render all the data saved in db and render back
});

app.post("/delete", (req, res) => {
  console.log(req.body);
  //find the item name in db, and delete it, and redirect to "/" again
  Notes.findOneAndDelete(
    {
      title: req.body.itemName,
    },
    function (err) {
      if (!err) {
        console.log("Successfully deleted checked item");
        res.redirect("/");
      }
    }
  );
});

app.listen(port, () => {
  console.log("App is running at port " + port);
});
