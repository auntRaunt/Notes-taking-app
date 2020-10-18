const express = require("express");
const router = express.Router();
const db = require("../../database");

router.get("/:user", (req, res) => {
  //Get the data from DB and render back
  const user = req.params.user;

  db.select("id", "title", "content", "username")
    .from("notes")
    .where("username", "=", user)
    .orderBy("id")
    .then((data) => {
      // console.log(data);
      res.render("showNote-db", { items: data, user: user });
    });
});

//form sending post request to this route
router.post("/:user", (req, res) => {
  const { title, content } = req.body;
  const user = req.params.user;
  db.insert({ title: title, content: content, username: req.params.user })
    .into("notes")
    .then(() => {
      res.redirect(`/note/${user}`);
    });
});

router.post("/:user/delete", (req, res) => {
  const user = req.params.user;
  const noteId = req.body.noteId;
  db("notes")
    .where({ id: noteId, title: req.body.itemName, username: user })
    .delete()
    .then(() => {
      res.redirect(`/note/${user}`);
    });
  //find the item name in db, and delete it, and redirect to "/" again
});

//if title change OR content change, after lost focus(blur()), send to update route, change the back
router.post("/:user/update/:id", (req, res) => {
  const { title, content } = req.body;
  db("notes")
    .where({
      id: req.params.id,
      username: req.params.user,
    })
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
