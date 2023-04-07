//pulling in all of the npm and built ins
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;

//getting the absolute path to my directory
const publicDir = path.join(__dirname, "/public");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET /notes should return the notes.html file.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(publicDir, "notes.html"));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", (req, res) => {
  let storedNotes = JSON.parse(fs.readFileSync, "./db/db.json", "utf8");
  res.json(storedNotes[Number(req.params.id)]);
});

// GET * should return the index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

//POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
app.post("/api/notes", (req, res) => {
  let storedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let incomingNote = req.body;
  let newId = storedNotes.length.toString();
  incomingNote.id = newId;
  storedNotes.push(incomingNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(storedNotes));
  res.json(storedNotes);
});

// DELETE /api/notes/:id should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.
app.delete("/api/notes/:id", (req, res) => {
  let storedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let incomingId = req.params.id;
  let id = 0;
  storedNotes = storedNotes.filter((note) => {
    return note.id != incomingId;
  });
  fs.writeFileSync("./db/db.json", JSON.stringify(storedNotes));
  res.json(storedNotes);
});

app.listen(PORT, () => {
  console.log("Server listening on %s", PORT);
});
