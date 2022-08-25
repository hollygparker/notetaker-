const router = require("express").Router();
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');

// GET route for notes
router.get('/', (req, res) => {
    res.json(JSON.parse(fs.readFileSync("./db/db.json", "utf8")))
});

// POST request to add a note
router.post('/', (req, res) => {
    console.log("INSIDE POST")
    console.info(`${req.method} request received`);

  // Destructuring items in req.body
  const { title, text, id } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuidv4()
    };
           
    const stringifyNote = JSON.stringify(newNote)
    // Obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err, stringifyNote) => {
      if (err) {
        console.error("ERR in read file", err);
      }
      console.log("NOTES" , stringifyNote);
        // parse string into JSON object
        let parsedNotes = JSON.parse(stringifyNote);
        parsedNotes.push(newNote)
        console.log(parsedNotes)
        // Write updated notes back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes),
          (err) =>
          err ? console.error(err) : console.log(`${newNote.title} has been written to file!`));
              res.json(parsedNotes);
            });
    }else{
        res.json("err in writing note")
    } 
    });

    
module.exports = router

