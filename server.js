const express = require('express');
const htmlRoutes = require("./routes/htmlRoutes")
const apiRoutes = require("./routes/apiRoutes")
const app = express();
const PORT = 3001;


// middle ware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// access to files in public folder
app.use(express.static('public'));
app.use('/api/notes',apiRoutes)
app.use('/', htmlRoutes)



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
