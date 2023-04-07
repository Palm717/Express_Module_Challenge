# Express Module Challenge

modify starter code to create an application called Note Taker

## Installation

```node.js
npm i express
```

## Usage

```javascript
app.use(express.static("public"));

# returns 'notes.html file'
app.get("/notes", (req, res) => {
  res.sendFile(path.join(publicDir, "notes.html"));
});

# returns 'read the db.json file and return all saved notes as JSON'
pp.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", (req, res) => {
  let storedNotes = JSON.parse(fs.readFileSync, "./db/db.json", "utf8");
  res.json(storedNotes[Number(req.params.id)]);
});

# returns 'index.html file'
app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

# returns 'new note to the client'
app.post("/api/notes", (req, res) => {
  let storedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let incomingNote = req.body;
  let newId = storedNotes.length.toString();
  incomingNote.id = newId;
  storedNotes.push(incomingNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(storedNotes));
  res.json(storedNotes);
});

# returns 'remove the note with the given id '
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
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Installation

```node.js
npm i express
```

## Demonstration

<video src='https://user-images.githubusercontent.com/61207668/230525762-287349d0-44ac-4f88-ba84-ed112ca5f4d3.mp4' width=180/>
