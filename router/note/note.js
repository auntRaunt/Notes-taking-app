const express = require("express");
const router = express.Router();
const db = require("../../database");

router.get("/", (req, res) => {
  //Get the data from DB and render back
  db.select("title", "content")
    .from("notes")
    .then((data) => {
      res.render("showNote-db", { items: data });
    });
});

//form sending post request to this route
router.post("/", (req, res) => {
  const { title, content } = req.body;
  db.insert({ title: title, content: content })
    .into("notes")
    .then(() => {
      res.redirect("/note");
    });
});

router.post("/delete", (req, res) => {
  db("notes")
    .where("title", req.body.itemName)
    .delete()
    .then(() => {
      res.redirect("/note");
    });

  //find the item name in db, and delete it, and redirect to "/" again
});

module.exports = router;
