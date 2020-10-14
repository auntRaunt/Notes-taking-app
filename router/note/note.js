const express = require("express");
const router = express.Router();
const db = require("../../database");

router.get("/", (req, res) => {
  //Get the data from DB and render back
  db.select("id", "title", "content")
    .from("notes")
    .orderBy("id")
    .then((data) => {
      // console.log(data);
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

//if title change OR content change, after lost focus(blur()), send to update route, change the back
router.post("/update/:id", (req, res) => {
  const { title, content } = req.body;
  db("notes")
    .where("id", "=", req.params.id)
    .update({
      title: title,
      content: content,
    })
    .orderBy("id")
    .then(() => {
      res.redirect("/note");
    });
});

module.exports = router;
