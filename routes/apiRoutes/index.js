const router = require("express").Router();
const path = require("path");
const fs = require("fs");
const { v4: someID } = require("uuid");

router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../db/db.json"));
});

router.post("/notes", (req, res) => {
  const { title, text } = req.body;

  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: someID(),
  };

  fs.readFile(path.join(__dirname, "../../db/db.json"), (err, data) => {
    const parsedNotes = JSON.parse(data);
    console.log(parsedNotes);
    parsedNotes.push(newNote);

    fs.writeFile(
      path.join(__dirname, "../../db/db.json"),
      JSON.stringify(parsedNotes),
      (err) => {
        if (err) throw err;
        console.log(data);
      }
    );
  });

  res.sendFile(path.join(__dirname, "../../db/db/json"));
});

// DELETE DOES NOT WORK YET
// router.delete("/notes", (req, res) => {
//   var id = req.body.id;

//   fs.readFile(path.join(__dirname, "../../db/db.json"), (err, data) => {
//     const parsedNotes = JSON.parse(data);
//     for (let i = 0; i < parsedNotes.length; i++) {
//       if (parsedNotes[i].body.id === id) {
//         parsedNotes.pop(i);
//       }
//     }

//     fs.writeFile(
//       path.join(__dirname, "../../db/db.json"),
//       JSON.stringify(parsedNotes),
//       (err) => {
//         if (err) throw err;
//         console.log(data);
//       }
//     );
//   });
// });

module.exports = router;
