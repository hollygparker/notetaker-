const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const uuid = require('./helpers/uuid');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

// app.get('/', (req, res) => res.send('Navigate to /notes or index.html'));
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
)

// GET route to get all of the notes or all the terms sorted
app.get('/api/notes', (req, res) => {
  console.log(res, 'first');

  // Check and see if there is a query parameter at all
  const hasQuery = Object.keys(req.query).length > 0;

  // If we have a query of 'sort' and it's value is 'dsc' send the results in descending order
  if (hasQuery && req.query.sort === 'dsc') {
    return res.json(sortHelper('dsc'));
  }

  // If we have a query of 'sort' and it's value is 'asc' send the results in ascending order
  if (hasQuery && req.query.sort === 'asc') {
    return res.json(sortHelper('asc'));
  }

  // If there is no query parameter, return db file
  return res.json(noteData);
});

// POST request to add a review
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { noteTitle, noteText } = req.body;

  // If all the required properties are present
  if (noteTitle && noteText) {
    // Variable for the object we will save
    const newNote = {
      noteTitle,
      noteText,
      review_id: uuid(),
    };

    // Obtain existing reviews
    fs.readFile('../db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
          '../db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});

// * // POST request for reviews
// app.post('/api/notes', (req, res) => {
//   // Inform the client that their POST request was received
//   res.json(`${req.method} request received to add a note`);

//   // Log our request to the terminal
//   console.info(`${req.method} request received to add a note`);
// });

// app.get('notes.html', (req, res) =>
//   res.sendFile(path.join(__dirname, 'notes.html'))
// );

// app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

// app.get('/send', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/send.html'))
// );

// app.get('/paths', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/paths.html'))
// );

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
