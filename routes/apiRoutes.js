
// API routes


// // GET route for notes
// app.get('/api/notes', (req, res) => {
//   console.log(res, 'first');
//   // If there is no query parameter, return db file
//   res.json(noteData);
  
// });

// // POST request to add a note
// app.post('/', (req, res) => {
//   // Log that a POST request was received
//   // console.info(`${req.method} request received to add a note`);

//   // Destructuring items in req.body
//   const { noteTitle, noteText } = req.body;

//   // If all the required properties are present
//   if (noteTitle && noteText) {
//     // Variable for the object we will save
//     const newNote = {
//       noteTitle,
//       noteText,
//       id: uuidv4(),
//     };

//     // id: uuidv4(),
//     // Obtain existing notes
//     fs.readFile('./db/db.json', 'utf8', (err, data) => {
//       if (err) {
//         console.error(err);
//       } else {
//         // Convert string into JSON object
//         let parsedNotes = JSON.parse(data);

//         // Add a new note
//         parsedNotes.push(newNote);

//         // Write updated notes back to the file
//         fs.writeFile(
//           './db/db.json',
//           JSON.stringify(parsedNotes),
//           (writeErr) =>
//             writeErr
//               ? console.error(writeErr)
//               : console.info('Successfully updated notes!')
//         );
//       }
//       res.JSON(parsedNotes);
//     });

//     const response = {
//       status: 'success',
//       body: newNote,
//     };

//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json('Error in posting note');
//   }
// });
