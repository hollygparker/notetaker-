const express = require('express');
const path = require('path');
const noteData = require('../db/db.json');

const app = express();
const PORT = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /notes or index.html'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
)

// GET route to get all of the notes or all the terms sorted
app.get('/api/notes/', (req, res) => {
  // console.log(req.params, 'first');

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
